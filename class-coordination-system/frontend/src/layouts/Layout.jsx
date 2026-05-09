import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiHome, FiMessageSquare, FiFileText, FiCalendar, 
  FiBell, FiUser, FiSettings, FiMenu, FiX, FiSun, 
  FiMoon, FiLogOut, FiBook, FiUsers, FiAward 
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [profileDropdown, setProfileDropdown] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const { user, logout } = useAuth()
  const { theme, toggleTheme, isDark } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/chat/general', icon: FiMessageSquare, label: 'Chat' },
    { path: '/assignments', icon: FiFileText, label: 'Assignments' },
    { path: '/quizzes', icon: FiAward, label: 'Quizzes' },
    { path: '/announcements', icon: FiBell, label: 'Announcements' },
    { path: '/calendar', icon: FiCalendar, label: 'Calendar' },
  ]

  if (user?.role === 'admin' || user?.role === 'teacher') {
    menuItems.push({ path: '/admin', icon: FiUsers, label: 'Admin Panel' })
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: sidebarOpen ? 0 : -280,
          width: sidebarOpen ? 280 : 0
        }}
        className={`fixed left-0 top-0 h-full glass-nav z-50 lg:translate-x-0 overflow-hidden`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8 px-2">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <FiBook className="text-white text-xl" />
              </div>
              <span className="font-bold text-lg gradient-text">ClassHub</span>
            </motion.div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${
                  location.pathname === item.path ? 'sidebar-item-active' : ''
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="border-t border-gray-200 dark:border-dark-border pt-4">
            <div className="flex items-center gap-3 px-2">
              <img
                src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.name}&background=0ea5e9&color=fff`}
                alt={user?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-[280px]' : ''}`}>
        {/* Navbar */}
        <header className="glass-nav sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
              >
                <FiMenu className="w-5 h-5" />
              </button>
              
              {/* Search Bar */}
              <div className="hidden md:flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input-field w-64 py-2"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
              >
                {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg relative"
                >
                  <FiBell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-80 glass-card rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-dark-border">
                        <h3 className="font-semibold">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto scrollbar-thin">
                        <div className="p-4 hover:bg-gray-50 dark:hover:bg-dark-border cursor-pointer">
                          <p className="text-sm font-medium">New Assignment Posted</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Data Structures - Due in 2 days
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-lg"
                >
                  <img
                    src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.name}&background=0ea5e9&color=fff`}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>

                <AnimatePresence>
                  {profileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 glass-card rounded-xl shadow-xl overflow-hidden"
                    >
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-border cursor-pointer"
                        onClick={() => setProfileDropdown(false)}
                      >
                        <FiUser className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-border cursor-pointer w-full text-left text-red-500"
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
