import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div>
      <ToastContainer></ToastContainer>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default App
