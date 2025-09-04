import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import Login from './USER/Login.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './USER/Register.jsx'
import AdminLogin from './Admin/AdminLogin.jsx'
import Dashboard from './Admin/Dashboard.jsx'
import UserHome from './USER/UserHome.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      { index: true, path: '', element: <Login></Login> },
      { path: "register", element: <Register></Register> },
      {
        path: "userHome", element: (
          <PrivateRoute>
            <UserHome></UserHome>
          </PrivateRoute>
        )
      },
      { path: "adminlogin", element: <AdminLogin></AdminLogin> },
      {
        path: "dashboard", element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        )
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}></RouterProvider>
)
