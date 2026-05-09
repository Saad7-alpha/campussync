import mongoose from 'mongoose'

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a subject name'],
    trim: true,
  },
  code: {
    type: String,
    required: [true, 'Please provide a subject code'],
    unique: true,
    uppercase: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  description: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
})

const Subject = mongoose.model('Subject', subjectSchema)

export default Subject
