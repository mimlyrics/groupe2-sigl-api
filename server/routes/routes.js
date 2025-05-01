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

router.post('/', protectAuth, createVehicle);
router.get('/', protectAuth, getAllVehicles);
router.get('/:id', protectAuth, getVehicleById);
router.put('/:id', protectAuth, updateVehicle);
router.delete('/:id', protectAuth, deleteVehicle);
router.get('/search/:immatriculation', protectAuth, searchByImmatriculation);
router.get('/price/:priceMax', protectAuth, filterByPrice);

module.exports= router;