import axios from 'axios'
import React, { useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
import { loginAdmin } from '../api/adminService'
import userAuthStore from '../store/authStore'

function AdminLogin() {

  const [adminData, setAdminData] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()
  const setUser = userAuthStore((state) => state.setUser);

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = adminData
    if (!email || !password) {
      alert("Please fill the form completely")
    } else {
      const res = await loginAdmin({ email, password })

      if (res.status === 200) {
        alert('login sucessfull')
        setUser(res);
        navigate('/dashboard')
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
          Admin Login
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
              value={adminData.email}
              onChange={(e) =>
                setAdminData({ ...adminData, email: e.target.value })
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
              value={adminData.password}
              onChange={(e) =>
                setAdminData({ ...adminData, password: e.target.value })
              }
              id="password"
              placeholder="Enter Password"
              className="w-full rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 
                         px-4 py-2 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
            />
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-lg shadow-md 
                         transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
            >
              Login
            </button>
          </div>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gray-700 rounded-lg text-sm text-gray-200">
          <p className="mb-2 font-medium text-center">Use for Checking:</p>
          <p>
            Email: <span className="font-bold">admin@gmail.com</span>
          </p>
          <p>
            Password: <span className="font-bold">1234</span>
          </p>
        </div>

        {/* Switch to User Panel */}
        <div className="mt-6 flex justify-center">
          <Link to={"/"}>
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg shadow-md transition">
              User Panel
            </button>
          </Link>
        </div>
      </div>
    </div>


    // OG style
    // <div className='m-4 text-center h-screen grid'>
    //     <h1 className='text-5xl text-black py-5 uppercase my-15'>Login Admin</h1>
    //     <div className='flex justify-center'>
    //       <form action="" className='flex flex-col justify-center p-12 bg-zinc-800 rounded-md '>
    //         <div className='mb-4 '>
    //           <label htmlFor="email" className='text-slate-300'>Username : </label>
    //           <input type="text" value={adminData.email} onChange={e => setAdminData({ ...adminData, email: e.target.value })} name='email' id='email' placeholder='Enter Username' />
    //         </div>
    //         <div className='mb-4'>
    //           <label htmlFor="password" className='text-slate-300'>Password : </label>
    //           <input type="text" value={adminData.password} onChange={e => setAdminData({ ...adminData, password: e.target.value })} name='password' id='password' placeholder='Enter Password' />
    //         </div>
    //         <div className='text-center'>
    //           <button className='bg-violet-700 text-violet-50 p-1 px-9 rounded-xl mr-3' onClick={handleLogin}>login</button>

    //         </div>
    //       </form>

    //     </div>
    //     <div className='my-8'>
    //       <h3>Use for Checking</h3>
    //       <h6> Email: <span className='font-bold'>admin@gmail.com</span></h6>
    //       <h6> Password: <span className='font-bold'>1234</span></h6>
    //     </div>
    //     <div className='flex justify-center '>
    //       <Link to={'/'}>
    //         <button className='bg-red-500 text-violet-50 py-1 px-9 rounded-xl '>User Panel</button>
    //       </Link>
    //     </div>
    //   </div>

  )
}

export default AdminLogin

