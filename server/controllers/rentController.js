
const Rent = require('../models/Rent');
const asyncHandler = require('express-async-handler');

const createRent = asyncHandler(async (req, res) => {
    const {userId, vehicleId}  = req.body;
    const rent = await Rent.create({userId, vehicleId});
    return res.status(200).json({rent});
})

const getRent = asyncHandler(async (req, res) => {
    const rents = await Rent.findAll();
    return res.status(200).json({rents})
})

const getRentById = asyncHandler (async (req, res) => {
    
})

module.exports = {createRent, getRent};