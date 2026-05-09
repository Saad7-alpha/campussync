import User from '../models/User.js'
import Message from '../models/Message.js'
import Notification from '../models/Notification.js'

const userSockets = new Map() // userId -> socketId

export const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`)

    // Handle user authentication on connect
    socket.on('authenticate', async ({ userId }) => {
      try {
        await User.findByIdAndUpdate(userId, { isOnline: true, lastSeen: Date.now() })
        
        userSockets.set(userId, socket.id)
        socket.userId = userId
        
        // Broadcast user online status
        io.emit('user_online', { userId })
        
        // Send user their unread notifications
        const notifications = await Notification.find({ 
          user: userId, 
          read: false 
        }).sort({ createdAt: -1 }).limit(10)
        
        socket.emit('notifications', notifications)
        
        console.log(`User ${userId} authenticated`)
      } catch (error) {
        console.error('Authentication error:', error)
      }
    })

    // Join chat room
    socket.on('join_room', (room) => {
      socket.join(room)
      console.log(`User ${socket.userId} joined room ${room}`)
    })

    // Leave chat room
    socket.on('leave_room', (room) => {
      socket.leave(room)
      console.log(`User ${socket.userId} left room ${room}`)
    })

    // Send message
    socket.on('send_message', async (data) => {
      try {
        const { room, content, type, file } = data
        
        const message = await Message.create({
          sender: socket.userId,
          room,
          content,
          type: type || 'text',
          file,
        })

        const populatedMessage = await Message.findById(message._id)
          .populate('sender', 'name profilePicture email')

        // Broadcast to room
        io.to(room).emit('new_message', populatedMessage)

        // Send notifications to other users in the room
        const usersInRoom = await getUsersInRoom(room)
        usersInRoom.forEach(uid => {
          if (uid !== socket.userId && userSockets.has(uid)) {
            const targetSocket = io.sockets.sockets.get(userSockets.get(uid))
            if (targetSocket) {
              targetSocket.emit('notification', {
                title: 'New Message',
                message: `${populatedMessage.sender.name}: ${content.substring(0, 50)}`,
                type: 'chat',
                relatedId: message._id,
              })
            }
          }
        })
      } catch (error) {
        console.error('Send message error:', error)
        socket.emit('error', { message: 'Failed to send message' })
      }
    })

    // Typing indicator
    socket.on('typing', (data) => {
      socket.to(data.room).emit('user_typing', {
        userId: socket.userId,
        room: data.room,
      })
    })

    // Stop typing
    socket.on('stop_typing', (data) => {
      socket.to(data.room).emit('user_stop_typing', {
        userId: socket.userId,
        room: data.room,
      })
    })

    // Handle disconnect
    socket.on('disconnect', async () => {
      console.log(`Socket disconnected: ${socket.id}`)
      
      if (socket.userId) {
        userSockets.delete(socket.userId)
        
        await User.findByIdAndUpdate(socket.userId, {
          isOnline: false,
          lastSeen: Date.now(),
        })
        
        io.emit('user_offline', { userId: socket.userId })
      }
    })

    // Error handling
    socket.on('error', (error) => {
      console.error('Socket error:', error)
    })
  })
}

// Helper function to get users in a room
const getUsersInRoom = async (room) => {
  // This would typically query your database for users subscribed to this room
  // For now, return empty array - implement based on your needs
  return []
}

export const getOnlineUsers = () => {
  return Array.from(userSockets.keys())
}

export const sendToUser = (io, userId, event, data) => {
  const socketId = userSockets.get(userId)
  if (socketId) {
    io.to(socketId).emit(event, data)
  }
}
