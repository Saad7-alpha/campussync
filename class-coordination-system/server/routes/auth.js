import express from 'express'
import { signup, login, getProfile, updateProfile, logout } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/profile', protect, getProfile)
router.put('/profile', protect, updateProfile)
router.post('/logout', protect, logout)

export default router
