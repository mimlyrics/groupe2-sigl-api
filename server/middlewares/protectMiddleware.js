const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const protectAuth = asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization;
    let token = null;
    if(authHeader) {
        token = authHeader.split(" ")[1];
    }
    if(token) {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        console.log(decoded);
        const {id} = decoded;
        try {
            req.user = await User.findByPk({where: {id}});
            next();
        }catch(err) {
            res.status = 401;
            return res.status(500).json("invalid token ");
        }

    }else {
        res.status = 401;
        return res.status(401).json("No token, please try to login")
    }
})

const protectAdmin = asyncHandler (async (req, res) => {

})

const protectEditor = asyncHandler(async (req, res) => {

})

module.exports = {protectAuth, protectAdmin, protectEditor}