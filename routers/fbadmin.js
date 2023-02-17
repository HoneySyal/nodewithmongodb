const express = require('express');
const router = express.Router();
const fbUserController = require('../controller/fbAdminController');

router.get("/", fbUserController.getList);

router.post("/create", fbUserController.addUser);

router.post("/update", fbUserController.updateUser);

router.post("/delete", fbUserController.deleteUser);

module.exports = router;