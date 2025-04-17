const Vehicle = require('../models/Vehicle');
const asyncHandler = require('express-async-handler');

const createVehicle = asyncHandler(async (req, res) => {
    const {registrationNumber, make, model, rentalPrice, year,type} = req.body;
    const vehicle = await Vehicle.create({registrationNumber, make, model, rentalPrice, year, type});
    return res.status(200).json({vehicle:vehicle});
})

const getVehicle = asyncHandler(async (req, res) => {
    const vehicles = await Vehicle.findAll();
    return res.status(200).json({vehicles});
})

const getVehicleById = asyncHandler (async (req, res) => {
    const {id} = req.params;
    const vehicle = await Vehicle.findOne({where: {id}});
    return res.status(200).json({vehicle: vehicle});
})

const updateVehicle = asyncHandler(async (req, res) => {
    //console.log(req.body);
    const {registrationNumber, make, model, rentalPrice, year, type} = req.body;
    const {id} = req.params;
    const vehicle = await Vehicle.findOne({where: {id}});
    vehicle.registrationNumber = registrationNumber || vehicle.registrationNumber;
    vehicle.make = make || vehicle.make;
    vehicle.model = model || vehicle.model;
    vehicle.rentalPrice = rentalPrice || vehicle.rentalPrice;
    vehicle.year = year || vehicle.year;
    vehicle.type = type || vehicle.type;
    await vehicle.save();
    return res.status(200).json({updatedVehicle: vehicle})
})

const deleteVehicle = asyncHandler(async(req, res) => {
    const {id} = req.params;
    await Vehicle.destroy({where: {id}});
    return res.status(200).json({message: `vehicle with ${id} has been deleted successfully`})
})

const getVehicleByRegistrationNumber = asyncHandler(async(req, res) => {
    const {registrationNumber} = req.params;
    const vehicle = await Vehicle.findOne({where: {registrationNumber}});
    return res.status(200).json({vehicle});

})

const getVehicleByMaxPrice = asyncHandler(async (req, res) => {
    const {maxPrice} = req.params;
    const vehicles = await Vehicle.findAll({where: {rentalPrice: rentalPrice < maxPrice}});
    return res.status(200).json({vehicles});
})

module.exports = {createVehicle, getVehicle, getVehicleById, updateVehicle, deleteVehicle, getVehicleByRegistrationNumber, getVehicleByMaxPrice};