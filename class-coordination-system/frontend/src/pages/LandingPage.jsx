import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiBook, FiMessageSquare, FiCalendar, FiAward, FiUsers, FiZap } from 'react-icons/fi'

const LandingPage = () => {
  const features = [
    { icon: FiBook, title: 'Assignment Management', description: 'Track and submit assignments with ease' },
    { icon: FiMessageSquare, title: 'Real-time Chat', description: 'Communicate with classmates instantly' },
    { icon: FiCalendar, title: 'Schedule & Reminders', description: 'Never miss a deadline again' },
    { icon: FiAward, title: 'Quiz Platform', description: 'Take quizzes and track performance' },
    { icon: FiUsers, title: 'Collaboration', description: 'Work together on group projects' },
    { icon: FiZap, title: 'Instant Notifications', description: 'Stay updated in real-time' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Navbar */}
      <nav className="glass-nav fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
              <FiBook className="text-white text-xl" />
            </div>
            <span className="font-bold text-xl gradient-text">ClassHub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="btn-secondary py-2">Login</Link>
            <Link to="/signup" className="btn-primary py-2">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Coordinate</span> Your Class
              <br />Like Never Before
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              The all-in-one platform for university classes. Manage assignments, 
              quizzes, announcements, and communication in one beautiful interface.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/signup" className="btn-primary text-lg px-8">
                Start Free
              </Link>
              <Link to="#features" className="btn-secondary text-lg px-8">
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Hero Image/Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16"
          >
            <div className="glass-card rounded-2xl p-4 max-w-5xl mx-auto shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <FiBook className="w-16 h-16 mx-auto mb-4 text-primary-500" />
                  <p className="text-gray-500 dark:text-gray-400">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white dark:bg-dark-card">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Everything Your Class <span className="gradient-text">Needs</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to make class coordination effortless
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl card-hover"
              >
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-12 gradient-bg"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Class?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Join hundreds of students and teachers already using ClassHub
            </p>
            <Link to="/signup" className="bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 inline-block">
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-dark-border py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 ClassHub. Built for better class coordination.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
