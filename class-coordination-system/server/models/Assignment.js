import mongoose from 'mongoose'

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  dueDate: {
    type: Date,
    required: [true, 'Please provide a due date'],
  },
  files: [{
    url: String,
    name: String,
    publicId: String,
  }],
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  submissions: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    file: {
      url: String,
      name: String,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['submitted', 'graded', 'pending'],
      default: 'pending',
    },
    grade: {
      type: Number,
      min: 0,
      max: 100,
    },
    feedback: {
      type: String,
      default: '',
    },
  }],
  totalMarks: {
    type: Number,
    default: 100,
  },
}, {
  timestamps: true,
})

const Assignment = mongoose.model('Assignment', assignmentSchema)

export default Assignment
