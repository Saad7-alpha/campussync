import React from 'react'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user } = useAuth()
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <div className="flex items-center gap-6 mb-6">
          <img 
            src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.name}&background=0ea5e9&color=fff`}
            alt={user?.name}
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
            <p className="text-sm text-primary-500 capitalize">{user?.role}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Semester</label>
            <p className="input-field">{user?.semester || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <p className="input-field">{user?.department || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
