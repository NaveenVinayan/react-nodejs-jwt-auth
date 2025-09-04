import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/userService'
import userAuthStore from '../store/authStore'

function Register() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const setUser = userAuthStore((state) => state.setUser);
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    const { email, password, confirmPassword } = userData
    if (!email || !password || !confirmPassword) {
      alert("Please fill the form completely")
    } else if (password != confirmPassword) {
      alert("Password does not match")
    }
    else {
      const res = await registerUser({ email, password })

      if (res.status === 200) {
        alert('Register sucessfull')
        setUser(res);
        navigate('/userHome')
      } else {
        alert('error')
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-zinc-800 to-gray-900 p-6">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-white mb-6 uppercase tracking-wide">
          Register User
        </h1>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              id="email"
              placeholder="Enter Username"
              className="w-full rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 
                         px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              id="password"
              placeholder="Enter Password"
              className="w-full rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 
                         px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              value={userData.confirmPassword}
              onChange={(e) =>
                setUserData({ ...userData, confirmPassword: e.target.value })
              }
              id="confirmPassword"
              placeholder="Enter Password Again"
              className="w-full rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 
                         px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
            />
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleRegister}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-lg shadow-md 
                         transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
            >
              Signup
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-300">Already a user?</p>
            <Link to={"/"}>
              <button className="mt-3 w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 rounded-lg shadow-md transition">
                Login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>

    // OG
    // <div className='m-4 text-center '>
    //   <h1 className='text-5xl text-black py-5 uppercase my-15'>Register User</h1>
    //   <div className='flex justify-center'>
    //     <form action="/register" method='post' className='px-28 py-24 bg-zinc-800 rounded-md '>
    //       <div className='mb-4 '>
    //         <label htmlFor="email" className='text-slate-300'>Username : </label>
    //         <input type="text" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} name='email' id='email' placeholder='Enter Username' />
    //       </div>
    //       <div className='mb-4'>
    //         <label htmlFor="password" className='text-slate-300'>Password : </label>
    //         <input type="text" value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} name='password' id='password' placeholder='Enter Password' />
    //       </div>
    //       <div className='mb-4'>
    //         <label htmlFor="confirmPassword" className='text-slate-300'>Confirm Password : </label>
    //         <input type="text" value={userData.confirmPassword} onChange={e => setUserData({ ...userData, confirmPassword: e.target.value })} name='confirmPassword' id='confirmPassword' placeholder='Enter Password Again' />
    //       </div>
    //       <div className='text-center'>
    //         <button className='bg-violet-700 text-violet-50 p-1 px-9 rounded-xl mr-3' onClick={handleRegister}>Signup</button>

    //         <div className='mt-9  flex justify-center'>
    //           <p className='text-slate-50'>Already a user ?  </p>
    //           <Link to={'/'}><button className='bg-violet-700 text-violet-50 p-1 px-9 rounded-xl ml-4' >Login</button></Link>
    //         </div>

    //       </div>
    //     </form>
    //   </div>
    // </div>
  )
}

export default Register
