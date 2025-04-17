const router = require('express').Router();
const {login, register, logout, getUsers, getUsersById} = require('../controllers/authControllers');

router.route('/register').post(register);
router.route('/login').get(login);
router.route('/logout').get(logout);
router.route('/users').get(getUsers)
router.route('/users/:id').get(getUsersById)
module.exports = router;