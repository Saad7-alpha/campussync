import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiFileText, FiCalendar, FiAward, FiBell, FiTrendingUp, FiUsers, FiBook } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    assignments: 5,
    quizzes: 3,
    announcements: 12,
    upcomingDeadlines: 2
  })

  const recentAssignments = [
    { id: 1, title: 'Data Structures HW', subject: 'DSA', dueDate: '2024-01-15', status: 'pending' },
    { id: 2, title: 'Database Project', subject: 'DBMS', dueDate: '2024-01-18', status: 'pending' },
    { id: 3, title: 'Web Dev Assignment', subject: 'Web Tech', dueDate: '2024-01-20', status: 'submitted' },
  ]

  const upcomingQuizzes = [
    { id: 1, title: 'OS Midterm', subject: 'Operating Systems', date: '2024-01-16' },
    { id: 2, title: 'Math Quiz', subject: 'Engineering Math', date: '2024-01-19' },
  ]

  const recentAnnouncements = [
    { id: 1, title: 'Class Cancelled Tomorrow', author: 'Prof. Smith', date: '2024-01-10' },
    { id: 2, title: 'New Lab Schedule', author: 'Admin', date: '2024-01-09' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 gradient-bg"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-white/80">
          Here's what's happening in your classes today
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: FiFileText, label: 'Assignments', value: stats.assignments, color: 'from-blue-500 to-cyan-500' },
          { icon: FiAward, label: 'Quizzes', value: stats.quizzes, color: 'from-purple-500 to-pink-500' },
          { icon: FiBell, label: 'Announcements', value: stats.announcements, color: 'from-orange-500 to-red-500' },
          { icon: FiCalendar, label: 'Due Soon', value: stats.upcomingDeadlines, color: 'from-green-500 to-emerald-500' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-xl p-4 card-hover"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <stat.icon className="text-white text-xl" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Assignments */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FiFileText className="text-primary-500" />
              Recent Assignments
            </h2>
          </div>
          <div className="space-y-3">
            {recentAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-card rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors cursor-pointer"
              >
                <div>
                  <h3 className="font-medium">{assignment.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {assignment.subject} • Due {assignment.dueDate}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  assignment.status === 'submitted' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                  {assignment.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Quizzes */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FiAward className="text-purple-500" />
              Upcoming Quizzes
            </h2>
          </div>
          <div className="space-y-3">
            {upcomingQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="p-4 bg-gray-50 dark:bg-dark-card rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors cursor-pointer"
              >
                <h3 className="font-medium">{quiz.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {quiz.subject}
                </p>
                <p className="text-xs text-primary-500 mt-2">
                  📅 {quiz.date}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Announcements & Calendar */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Announcements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FiBell className="text-orange-500" />
              Recent Announcements
            </h2>
          </div>
          <div className="space-y-3">
            {recentAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="p-4 bg-gray-50 dark:bg-dark-card rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors cursor-pointer"
              >
                <h3 className="font-medium">{announcement.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  By {announcement.author} • {announcement.date}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: FiFileText, label: 'Submit Assignment', path: '/assignments' },
              { icon: FiAward, label: 'Take Quiz', path: '/quizzes' },
              { icon: FiMessageSquare: 'Chat', path: '/chat/general' },
              { icon: FiCalendar, label: 'View Calendar', path: '/calendar' },
            ].map((action, index) => (
              <button
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-dark-card rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-all hover:-translate-y-1 cursor-pointer"
              >
                <action.icon className="w-6 h-6 text-primary-500 mb-2" />
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
