import express from 'express'
import { 
  createAssignment, 
  getAssignments, 
  getAssignment, 
  submitAssignment, 
  gradeAssignment, 
  deleteAssignment 
} from '../controllers/assignmentController.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router()

router.use(protect)

router.route('/')
  .get(getAssignments)
  .post(authorize('teacher', 'cr', 'admin'), createAssignment)

router.route('/:id')
  .get(getAssignment)
  .delete(authorize('teacher', 'admin'), deleteAssignment)

router.post('/:id/submit', submitAssignment)
router.put('/:id/grade', authorize('teacher'), gradeAssignment)

export default router
