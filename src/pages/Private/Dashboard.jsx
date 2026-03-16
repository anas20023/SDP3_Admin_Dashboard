import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Dashboard = () => {
  const { logout, user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Private Dashboard</h1>
      {user && <p className="mb-4">Welcome, {user.email || 'Admin'}!</p>}
      <button 
        onClick={logout}
        className="btn btn-secondary"
      >
        Logout
      </button>
    </div>
  )
}
export default Dashboard
