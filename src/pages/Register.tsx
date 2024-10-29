import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../apiUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [togglePassword, setTogglePassword] = useState(false);
  const [isLogginIn, setIsLogginIn] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Registering with", formData);
    // Handle registration logic here
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, formData);

      if(response && response.data) {
        toast(response.data.message); // Accessing message from response.data
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast("An error occurred during registration.");
    }
  }

  return (
    <div className="flex items-center justify-center pt-16 bg-gray-50 px-4">
      <div className='toastify-message'>
          <ToastContainer />
        </div>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <p className='my-2 text-center'>Welcome to Sterling Spaces!</p>
        <form onSubmit={handleRegister}>
        <div className="mb-4">
            <label className="block text-gray-700 text-xs font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-xs font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-xs font-medium mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-xs font-medium mb-2">Residential Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-xs font-medium mb-2">Password</label>
            <div className='flex items-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-4'>
            <input
              type={togglePassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 outline-none"
            />
            {togglePassword ? <FaRegEye onClick={() => setTogglePassword(!togglePassword)}/> : <FaRegEyeSlash onClick={() => setTogglePassword(!togglePassword)}/>} 
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-xs font-medium mb-2">Confirm Password</label>
            <input
              type={togglePassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          >
              {isLogginIn ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;