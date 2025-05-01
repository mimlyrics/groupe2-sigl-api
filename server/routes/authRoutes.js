const router = require('express').Router();
const {login, register, logout, getUsers, getUsersById, deleteUsersById} = require('../controllers/authControllers');

router.route('/register').post(register);
router.route('/login').get(login);
router.route('/logout').get(logout);
router.route('/users').get(getUsers)
router.route('/users/:id').get(getUsersById).delete(deleteUsersById)
module.exports = router;