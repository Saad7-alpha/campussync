import mongoose from 'mongoose'

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Please provide announcement content'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  attachments: [{
    url: String,
    name: String,
  }],
  isPinned: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
})

const Announcement = mongoose.model('Announcement', announcementSchema)

export default Announcement
