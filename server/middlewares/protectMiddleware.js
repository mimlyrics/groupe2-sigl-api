const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const protectAuth = asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization;
    let token = null;
    if(authHeader) {
        token = authHeader.split(" ")[1];
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
})

const protectAdmin = asyncHandler (async (req, res) => {

})

const protectEditor = asyncHandler(async (req, res) => {

})

module.exports = {protectAuth, protectAdmin, protectEditor}