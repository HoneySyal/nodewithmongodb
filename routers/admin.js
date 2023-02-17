const express = require('express');
const router = express.Router();
const userController = require('../controller/adminController');
const auth = require('../auth/auth');

router.get('/', auth, userController.getUser);

router.post('/add-user', userController.addUser);

router.put('/edit-user/:id', userController.editUser);

router.delete('/delete-user/:id', userController.deleteUser);

router.post('/login', userController.loginUser);



module.exports = router;