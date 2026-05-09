import Assignment from '../models/Assignment.js'
import Subject from '../models/Subject.js'

// @desc    Create assignment
// @route   POST /api/assignments
// @access  Private (Teacher/CR/Admin)
export const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, subjectId, totalMarks, files } = req.body

    const assignment = await Assignment.create({
      title,
      description,
      dueDate,
      subject: subjectId,
      createdBy: req.user._id,
      totalMarks,
      files: files || [],
    })

    res.status(201).json({ success: true, data: assignment })
  } catch (error) {
    console.error('Create assignment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Get all assignments
// @route   GET /api/assignments
// @access  Private
export const getAssignments = async (req, res) => {
  try {
    const { subjectId, status } = req.query
    
    let query = {}
    
    if (subjectId) {
      query.subject = subjectId
    }

    const assignments = await Assignment.find(query)
      .populate('subject', 'name code')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })

    res.json({ success: true, count: assignments.length, data: assignments })
  } catch (error) {
    console.error('Get assignments error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Get single assignment
// @route   GET /api/assignments/:id
// @access  Private
export const getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('subject', 'name code')
      .populate('createdBy', 'name email')
      .populate('submissions.student', 'name email')

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' })
    }

    res.json({ success: true, data: assignment })
  } catch (error) {
    console.error('Get assignment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Submit assignment
// @route   POST /api/assignments/:id/submit
// @access  Private (Student)
export const submitAssignment = async (req, res) => {
  try {
    const { file } = req.body
    const assignment = await Assignment.findById(req.params.id)

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' })
    }

    // Check if already submitted
    const existingSubmission = assignment.submissions.find(
      s => s.student.toString() === req.user._id.toString()
    )

    if (existingSubmission) {
      return res.status(400).json({ message: 'You have already submitted this assignment' })
    }

    assignment.submissions.push({
      student: req.user._id,
      file,
      submittedAt: Date.now(),
      status: 'submitted',
    })

    await assignment.save()

    res.json({ success: true, message: 'Assignment submitted successfully', data: assignment })
  } catch (error) {
    console.error('Submit assignment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Grade assignment
// @route   PUT /api/assignments/:id/grade
// @access  Private (Teacher)
export const gradeAssignment = async (req, res) => {
  try {
    const { studentId, grade, feedback } = req.body
    const assignment = await Assignment.findById(req.params.id)

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' })
    }

    const submission = assignment.submissions.find(
      s => s.student.toString() === studentId
    )

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' })
    }

    submission.grade = grade
    submission.feedback = feedback
    submission.status = 'graded'

    await assignment.save()

    res.json({ success: true, message: 'Assignment graded successfully', data: assignment })
  } catch (error) {
    console.error('Grade assignment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Delete assignment
// @route   DELETE /api/assignments/:id
// @access  Private (Teacher/Admin)
export const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' })
    }

    await assignment.deleteOne()

    res.json({ success: true, message: 'Assignment deleted successfully' })
  } catch (error) {
    console.error('Delete assignment error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
