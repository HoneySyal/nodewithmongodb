const express = require('express');
const router = express.Router();
const userController = require('../controller/adminController');
const auth = require('../auth/auth');
const admin = require('../auth/admin');

router.get('/', auth, userController.getUser);

router.post('/add-user', auth, userController.addUser);

router.put('/edit-user/:id', admin, auth, userController.editUser);

router.delete('/delete-user/:id', auth, userController.deleteUser);

router.post('/login', userController.loginUser);



module.exports = router;