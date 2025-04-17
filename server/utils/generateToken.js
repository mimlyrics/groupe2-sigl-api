const jwt = require('jsonwebtoken')
const generateAccessToken = (res, obj) => {
    console.log(obj);
    const token = jwt.sign(obj, process.env.JWT_ACCESS_TOKEN, {expiresIn: '10d'});
    console.log(token);
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30*24*60*60*1000

    })
    console.log(token);
    return token;
};

const generateRefreshToken = (res, obj) => {
    console.log(obj);
    const token = jwt.sign(obj, process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'});
    console.log(token);
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30*24*60*60*1000

    })
    console.log(token);
    return token;
};

module.exports = {generateAccessToken, generateRefreshToken};