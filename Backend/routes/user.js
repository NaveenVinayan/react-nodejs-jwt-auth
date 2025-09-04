const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const authMiddleware = require('../middlewares/authMiddleware')



router.post('/login', userController.login)
router.post('/register', userController.registerUser)
router.post('/logout', authMiddleware.userProtect ,userController.logout)




module.exports = router