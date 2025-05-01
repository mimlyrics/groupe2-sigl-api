const router = require('express').Router();
const {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  searchByImmatriculation,
  filterByPrice
} = require('../controllers/vehicleController.js');
const {protectAuth, protectAdmin, protectEditor} = require('../middlewares/protectMiddleware.js')

router.route('/vehicle').post(protectAuth, createVehicle);
router.get('/vehicle', protectAuth, getAllVehicles);
router.get('/vehicle/:id', protectAuth, getVehicleById);
router.put('/vehicle/:id', protectAuth, updateVehicle);
router.delete('/vehicle/:id', protectAuth, deleteVehicle);
router.get('/search/:immatriculation', protectAuth, searchByImmatriculation);
router.get('/price/:priceMax', protectAuth, filterByPrice);

module.exports= router;