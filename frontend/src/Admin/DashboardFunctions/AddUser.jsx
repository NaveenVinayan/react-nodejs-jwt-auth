import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddUser() {
    // MODAL OPEN
    const [open, setOpen] = useState(false);

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    

    // TABLEE DATA REFRESH
    useEffect(() => {
        axios.get('http://localhost:3000/admin/alluser')
            .catch(err => console.log(err))
    }, [])

    // ADD USER
    const handleRegister = async (e) => {
        e.preventDefault()
        const { email, password } = userData
        console.log(email,password)
        if (!email || !password) {
            alert("Please fill the form completely")
        }
        else {
            const res = await axios.post('http://localhost:3000/admin/add-user', { email, password })
            console.log(res.data, 'from backend');
            if (res.status === 200) {
                alert('Register sucessfull')
                setOpen(false)
                navigate('/dashboard')
            } else {
                alert('error')
            }
        }
    }

    return (
        <div>
            {/* Modal for Add User */}
            <div className="flex ">
                {/* Open Modal Button */}
                <button
                    onClick={() => setOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                    Add User
                </button>

                {/* Modal */}
                {open && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Add User in to our platform
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
                                <form className="space-y-4" id="addUserForm" onSubmit={handleRegister}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                        <input type="email" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@mail.com" required />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>

                                    <button type="submit"  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add user to server</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default AddUser
