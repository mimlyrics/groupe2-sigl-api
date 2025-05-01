const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const protectAuth = asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization;
    let token = null;
    console.log('checking auth...')
    if(authHeader) {
        token = authHeader.split(" ")[1];
    }
    console.log(token);
    if(token) {
        try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        console.log(decoded);
        const {id} = decoded;
        
            req.user = await User.findByPk({where: {id}});
            next();
        }
        catch(err) {
            res.status(401);
            return res.status(401).json("Not authorized, invalid token");
        }

    }else {
        res.status(401);
        return res.status(401).json("Not authorized, No token, please try to login")
    }
})

const protectAdmin = asyncHandler (async (req, res) => {

})

const protectEditor = asyncHandler(async (req, res) => {

})

module.exports = {protectAuth, protectAdmin, protectEditor}