import Message from '../models/Message.js'

// @desc    Get messages for a room
// @route   GET /api/messages/:room
// @access  Private
export const getMessages = async (req, res) => {
  try {
    const { room } = req.params
    const { limit = 50 } = req.query

    const messages = await Message.find({ room })
      .populate('sender', 'name profilePicture')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))

    res.json({ success: true, count: messages.length, data: messages.reverse() })
  } catch (error) {
    console.error('Get messages error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Send message
// @route   POST /api/messages
// @access  Private
export const sendMessage = async (req, res) => {
  try {
    const { room, content, type, file } = req.body

    const message = await Message.create({
      sender: req.user._id,
      room,
      content,
      type: type || 'text',
      file,
    })

    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'name profilePicture email')

    res.status(201).json({ success: true, data: populatedMessage })
  } catch (error) {
    console.error('Send message error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Edit message
// @route   PUT /api/messages/:id
// @access  Private
export const editMessage = async (req, res) => {
  try {
    const { content } = req.body
    const message = await Message.findById(req.params.id)

    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }

    if (message.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this message' })
    }

    message.content = content
    message.edited = true
    await message.save()

    res.json({ success: true, data: message })
  } catch (error) {
    console.error('Edit message error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)

    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }

    if (message.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this message' })
    }

    message.deleted = true
    message.content = '[Deleted]'
    await message.save()

    res.json({ success: true, message: 'Message deleted successfully' })
  } catch (error) {
    console.error('Delete message error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
