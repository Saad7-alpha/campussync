import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  date: {
    type: Date,
    required: [true, 'Please provide a quiz date'],
  },
  syllabus: {
    type: String,
    required: [true, 'Please provide syllabus details'],
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  duration: {
    type: Number, // in minutes
    default: 60,
  },
  totalMarks: {
    type: Number,
    default: 100,
  },
  questions: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    marks: {
      type: Number,
      default: 1,
    },
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
})

const Quiz = mongoose.model('Quiz', quizSchema)

export default Quiz
