import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import AddUser from './DashboardFunctions/AddUser';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  // USER DETAILS FOR MAP
  const [data, setData] = useState([])


  // MODAL OPEN

  const [open, setOpen] = useState(false);
   


  const [editUserId, setEditUserId] = useState('');




  const [updateData, setUpdateData] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();


  // logout
  const logout = (() =>{
    localStorage.clear();
    navigate('/adminlogin')
  })

  // Update User
  const handleUpdate = async (e) => {
    e.preventDefault()
    const { email, password } = updateData
    if (!email || !password) {
      alert("Please fill the form completely")
    }
    else {
      const res = await axios.post('http://localhost:3000/admin/edit-user', {    _id:editUserId,    email, password })
      console.log(res.data, 'from backend');
      if (res.status === 200) {
        alert('updated sucessfully')
        navigate('/dashboard')
      } else {
        alert('error')
      }
    }
  }



  // TAKE DATA FROM DB FOR MAPPING
  useEffect(() => {
    axios.get('http://localhost:3000/admin/alluser')
      .then(res => {
        setData(res.data.data);
      })
      .catch(err => console.log(err))
  }, [handleDelete,handleUpdate])

  // DELETE FUNCTION
  function handleDelete(_id, index) {
    console.log(_id)
    const confirm = window.confirm(`Would you like to Delete? ${index + 1} `);
    if (confirm) {
      axios.get(`http://localhost:3000/admin/delete-user/${_id}`)
        .then(res => {
          alert("Record Deleted")
        })
    }

  }

  return (
    <div className='p-6'>
      {/* Navbar */}
      <nav className="navbar mb-5">
        <h1 className='text-3xl mb-3'>Admin Dashboard</h1>
        <button onClick={logout} className="btn-primary bg-red-600 px-2 py-1 rounded-sm  mx-2 text-xs text-white uppercase" >Logout</button>
      </nav>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {/* TABLE HEAD */}
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No:
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {/* TABLE BODY */}


          <tbody>
            {data.map((user, index) => (
              <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

                <td className="px-6 py-4">{index + 1}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.email}</th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.password}</th>
                <td className="px-6 py-4 flex">
                  <div>

                    {/* Edit BUTTON */}
                    <button
                      onClick={() => {

                        setEditUserId(user._id);
                        setUpdateData({email: user.email, password: ""});


                        setOpen(true);

                      }}
                      className="btn-primary bg-blue-700 px-2 py-1 rounded-sm mx-2 text-xs text-white uppercase"                   >
                      Edit
                    </button>

                    {open         && editUserId === user._id           && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black/25 z-50">

                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                          {/* <!-- Modal header --> */}
                          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              Edit User in to our platform
                            </h3>
                            <button type="button" onClick={() => setOpen(false)} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                              </svg>
                              <span className="sr-only">Close modal</span>
                            </button>
                          </div>
                          {/* <!-- Modal body --> */}
                          <div className="p-4 md:p-5">
                            <form className="space-y-4"  onSubmit={handleUpdate}>
                              <div>
                                <label htmlFor={`email-${user._id}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input type="email" value={updateData.email} onChange={e => setUpdateData({ ...updateData, email: e.target.value })} name={`email-${user._id}`} id={`email-${user._id}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@mail.com" required />
                              </div>
                              <div>
                                <label htmlFor={`password-${user._id}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" value={updateData.password} onChange={e => setUpdateData({ ...updateData, password: e.target.value })} name={`password-${user._id}`} id={`password-${user._id}`} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                              </div>

                              <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add user to server</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                  <div>
                    {/* Delete User BUTTON*/}
                    <button onClick={() => handleDelete(user._id, index)} className="btn-primary bg-red-600 px-2 py-1 rounded-sm  mx-2 text-xs text-white uppercase" >Delete</button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      <AddUser />
    </div>
  )




}

export default Dashboard
