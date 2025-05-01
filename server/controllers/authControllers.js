const Token = require('../models/Token');
const User = require('../models/User');
const {generateAccessToken, generateRefreshToken} = require('../utils/generateToken');
const asyncHandler = require('express-async-handler');
const register = async (req, res) => {
    const {name, email, password, phone, role} = req.body;
    console.log(req.body);

    const user = await User.findOne({ where : { email } });
    if(user) {
        res.status(401);
        throw new Error('User already exists');
    }

    const newUser = await User.create({name, email, password, phone, role});
    console.log(newUser.id);
    if(newUser) {
        
        const {id, email, role} = newUser;
        const obj = {id,email, role};
        console.log(obj);
        const accesstoken = generateAccessToken(res, obj);
        const refreshToken = generateRefreshToken(res, obj);
        const newToken = await Token.create({userId: id, token: refreshToken});
        console.log(newToken);
        res.status(200).json({user: {
            id: id,
            email: newUser.email,
            name: newUser.name,
            accesstoken: accesstoken
        }})
    }else {
        res.status(400);
        throw new Error('Invalid data');
    }
    

}

const login = async (req, res) => {

    // get cookie, check if user exists, get all his tokens
    const authHeader = req.headers.authorization;
    //console.log(authHeader);
    let cookie = null;
    if(authHeader) {
        cookie = authHeader.split(' ')[1];
    }
    console.log(cookie)
    let {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    //console.log(user);
    let getToken = await User.findByPk(user.id, {include: [{model:Token, as: 'tokens'}]});
    let tokenArray = [];
    getToken.tokens.map((tokent, i) => {
        console.log(tokent.token);
        let {id, token, userId} = tokent;
        let obj = {id, token, userId}
        tokenArray.push(obj);
        return tokenArray;
    });
    let tokens = tokenArray;
    //console.log(tokens);
    validPassword = await user.matchPassword(password);
    console.log(validPassword);

    if(user && validPassword) {
        let newRefreshTokenArray = !cookie ? tokens: tokens.filter(rt=> rt.token !== cookie);
        //console.log(newRefreshTokenArray);
        if(cookie) {
        // 1 user logs in but never uses RT and does not logout
            // RT is stolen
            // 1 & 2, REUSE detection is needed to clear all RTS when user logs in

            const refreshToken = cookie;
            const foundToken = await Token.findOne({where: {refreshToken}});

            // detected refresh token reuse
            if(!foundToken) {
                console.log('attempted refresh token reuse at login');
                newRefreshTokenArray = [];
            }
            res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
        }
        console.log('processing.....')
        let obj = {'id':user.id, 'email':user.email, 'role': user.role};
        const accessToken = generateAccessToken(res, obj);
        const newRefreshToken = generateRefreshToken(res, obj);
        tokens = [...newRefreshTokenArray, newRefreshToken];

        console.log(newRefreshToken);
        await user.save();
        res.cookie('jwt', newRefreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000});
        res.status(200).json({
            user: {
                email: user.email,
                role: user.role
            }
        })
    
    }else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
}

const logout = asyncHandler (async (req, res) => {  
    const authHeader = req.headers.authorization;
    //console.log(authHeader);
    let cookie = null;
    if(authHeader) {
        cookie = authHeader.split(' ')[1];
    }
    console.log(cookie)

    if(!cookie) return res.status(204).json({message: 'no jwt cookie'});
    const refreshToken = cookie;

    const token = await Token.findOne({where: {token: refreshToken}});
    console.log(token);
    if(!token) {
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'None',
            secure: true
        })

        return res.status(200).json({message: "Cookie has been removed"});
    }

    // delete refreshToken in db
    await token.destroy();
    //await token.save();
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
    return res.status(200).json({message: 'user logged out'});
});

const getUsers = asyncHandler (async (req, res) => {
    const users = await User.findAll();
    return res.status(200).json({users: users});
})

const getUsersById = asyncHandler(async (req, res) => {
    const users = User.findOne({where: {id}});
})

const deleteUsersById = asyncHandler(async (req, res) => {
    const {id} = req.params;
    await User.destroy({where: {id}});
    return res.status(200).json(`user with ${id} deleted successfully`)
})

module.exports = {register, login, logout, getUsers, getUsersById, deleteUsersById};