import express from 'express'
import { 
  getMessages, 
  sendMessage, 
  editMessage, 
  deleteMessage 
} from '../controllers/messageController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.use(protect)

router.route('/:room')
  .get(getMessages)

router.route('/')
  .post(sendMessage)

router.route('/:id')
  .put(editMessage)
  .delete(deleteMessage)

export default router
