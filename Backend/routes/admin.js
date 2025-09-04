const express = require('express')
const router = express.Router();
const adminController = require('../controller/adminController')
const authMiddleware = require('../middlewares/authMiddleware')


router.post('/login', adminController.login)
router.post('/add-user',  authMiddleware.protect ,  adminController.addUser)
router.get('/delete-user/:id',  authMiddleware.protect ,  adminController.deleteUser)
router.post('/edit-user',  authMiddleware.protect ,  adminController.editUser)
router.get('/alluser', authMiddleware.protect , adminController.allUser)
router.post('/logout', adminController.logout)


module.exports = router