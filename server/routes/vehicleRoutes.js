const router = require('express').Router();
const {getVehicle, getVehicleById, updateVehicle, createVehicle, deleteVehicle, getVehicleByRegistrationNumber, getVehicleByMaxPrice} = require('../controllers/vehicleController');
router.route('/vehicle').post(createVehicle);
router.route('/vehicles').get(getVehicle);
router.route('/vehicle/:id').get(getVehicleById).put(updateVehicle).delete(deleteVehicle);
router.route('/vehicle/search/:registrationNumber').get(getVehicleByRegistrationNumber);
router.route('/vehicles/price/:maxPrice').get(getVehicleByMaxPrice);
module.exports = router;