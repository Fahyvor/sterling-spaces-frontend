import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../apiUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLogginIn, setIsLogginIn] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with", formData);
    setIsLogginIn(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, formData);

      if(response && response.status == 200) {
       toast.success(response.data.message);
       console.log(response.data);
       localStorage.setItem('userData', JSON.stringify(response.data.newUser));
       localStorage.setItem('userToken', response.data.token);
       window.location.href="/"
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'An error occurred');
        console.log(error.response?.data || error.message);
      } else {
        toast.error('An unexpected error occurred');
        console.log('Unexpected error:', error);
      }
    } finally {
      setIsLogginIn(false);
    }
  };

  return (
    <div className="flex items-center justify-center pt-16 py-auto min-h-screen bg-gray-50 px-4">
        <div className='toastify-message'>
          <ToastContainer />
        </div>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-xs font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-xs font-semibold mb-2">Password</label>
            <div className='flex items-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-4'>
            <input
              type={togglePassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full outline-none px-4 py-2 "
            />
            {togglePassword ? <FaRegEye onClick={() => setTogglePassword(!togglePassword)}/> : <FaRegEyeSlash onClick={() => setTogglePassword(!togglePassword)}/>} 
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          >
              {isLogginIn ? "Logggin In..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <a href="/#/register" className="text-green-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
