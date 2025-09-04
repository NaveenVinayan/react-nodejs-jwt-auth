import React from 'react'
import { useNavigate } from 'react-router-dom'
import userAuthStore from '../store/authStore';

function UserHome() {

  const navigate = useNavigate()


  const logout = () => {
    navigate('/')
  }



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-zinc-800 to-gray-900 p-6">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        {/* Greeting */}
        <h1 className="text-3xl font-bold text-white mb-3">Hello User 👋</h1>
        <h2 className="text-lg text-gray-300 mb-8">Welcome back!</h2>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg shadow-md 
                     transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
        >
          Logout
        </button>
      </div>
    </div>

    // og
    // <div>
    //   <h1>Hello User</h1>
    //   <h2>Welcome back</h2>
    //   <button onClick={logout} className='p-2 bg-emerald-600'>Logout</button>
    // </div>
  )
}

export default UserHome



