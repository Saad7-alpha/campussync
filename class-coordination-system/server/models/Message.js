import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  room: {
    type: String,
    required: true,
    index: true,
  },
  content: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['text', 'file', 'system'],
    default: 'text',
  },
  file: {
    url: String,
    name: String,
    type: String,
  },
  edited: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
})

messageSchema.index({ room: 1, createdAt: -1 })

const Message = mongoose.model('Message', messageSchema)

export default Message
