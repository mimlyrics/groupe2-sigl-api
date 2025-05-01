const jwt = require('jsonwebtoken');
const { User, Token } = require('../models'); 
const { generateToken, generateAccessToken } = require('../utils/token');

const asyncHandler = require('express-async-handler');
const { User, Token } = require('../models'); 
const { generateToken, generateAccessToken } = require('../utils/token'); 

const auth = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    const { email, password } = req.body;

    const user = await User.findOne({
        where: { email },
        include: { model: Token, as: 'refreshTokens' },
    });

    if (user && (await user.validPassword(password))) {
        let newRefreshTokenArray = [];

        if (!cookies?.jwt) {
            newRefreshTokenArray = user.refreshTokens.map(t => t.refreshToken);
        } else {
            // Filter out the old refresh token
            newRefreshTokenArray = user.refreshTokens
                .map(t => t.refreshToken)
                .filter(rt => rt !== cookies.jwt);
        }

        if (cookies?.jwt) {
            const refreshToken = cookies.jwt;

            const foundToken = await Token.findOne({
                where: { refreshToken },
                include: { model: User, as: 'User' }
            });

            // Detected refresh token reuse
            if (!foundToken) {
                console.log('Attempted refresh token reuse at login');
                // Clear all refresh tokens for this user
                await Token.destroy({ where: { userId: user.id } });
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
            });
        }

        // Generate tokens
        const newRefreshToken = generateToken(res, user.id, user.role);
        const accessToken = generateAccessToken(res, user.id, user.role);

        // Save new refresh token to DB
        await Token.create({ userId: user.id, refreshToken: newRefreshToken });

        // Rebuild refreshToken array by querying the DB (or use newRefreshTokenArray)
        const updatedTokens = [...newRefreshTokenArray, newRefreshToken];

        res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            accessToken: accessToken,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(401).json({ message: 'No cookie' });
    }

    const refreshToken = cookies.jwt;

    // Clear the old refresh token cookie
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
    });

    // Check if refresh token exists in DB
    const foundToken = await Token.findOne({
        where: { refreshToken },
        include: { model: User, as: 'User' }
    });

    // REUSE DETECTION
    if (!foundToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

            const hackedUser = await User.findByPk(decoded.userId, {
                include: { model: Token, as: 'refreshTokens' }
            });

            if (hackedUser) {
                // Remove all refresh tokens for that user
                await Token.destroy({ where: { userId: hackedUser.id } });
            }

            return res.status(401).json({ message: 'Unauthorized: token reuse detected' });
        } catch (err) {
            return res.status(403).json({ message: 'Forbidden: invalid token' });
        }
    }

    const user = foundToken.User;

    // Remove the used refresh token from DB
    await Token.destroy({ where: { refreshToken } });

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        if (user.id !== decoded.userId) {
            return res.status(403).json({ message: 'User ID mismatch' });
        }

        // Token is valid, issue new ones
        const accessToken = generateAccessToken(res, user.id, user.role);
        const newRefreshToken = generateToken(res, user.id, user.role);

        // Save new refresh token to DB
        await Token.create({ userId: user.id, refreshToken: newRefreshToken });

        // Send new token in cookie
        res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        return res.status(201).json({ accessToken });

    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
};

module.exports = handleRefreshToken;