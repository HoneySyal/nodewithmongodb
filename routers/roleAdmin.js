const express = require('express');
const router = express.Router();
const userController = require('../controller/adminController');

router.get('/admin-role', userController.adminRole);


module.exports = router;