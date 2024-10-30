import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../apiUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type HouseInput = {
  title: string;
  description: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: File[];
  localGovernment: string;
  state: string;
};

const AddHouse: React.FC = () => {
  const stateLGAMap: Record<string, string[]> = {
    "Rivers": [
      "Abua-Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", "Andoni", "Asari-Toru", "Bonny", "Degema", "Eleme", "Emohua", "Etche", "Gokana", "Ikwerre", "Khana", "Obio-Akpor", "Ogba–Egbema–Ndoni", "Ogu–Bolo", "Okrika", "Omuma", "Opobo–Nkoro", "Oyigbo", "Port Harcourt", "Tai"
    ],
    // Add other states and their LGAs here
  };

  const [formData, setFormData] = useState<HouseInput>({
    title: '',
    description: '',
    address: '',
    price: 0,
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    images: [],
    localGovernment: '',
    state: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' || name === 'area' ? +value : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 4);
      setFormData((prev) => ({ ...prev, images: files }));

      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews(newPreviews);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/api/properties/add-property`, formData);
      if (response && response.status === 201) {
        toast.success("House Successfully Created");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "An error occurred while creating the house");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-1/2 pt-16 mx-auto py-8">
      <div className='toastify-message'>
        <ToastContainer />
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center">List Your Property</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {/* Property Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
            Property Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Spacious 2-Bedroom Apartment"
            required
          />
        </div>

        {/* Property Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
            Property Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="This apartment is well furnished with..."
            required
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter the property address"
            required
          />
        </div>

        {/* State */}
        <div className="mb-4">
          <label htmlFor="state" className="block text-gray-700 font-semibold mb-2">
            State
          </label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={(e) => {
              handleChange(e);
              setFormData((prev) => ({
                ...prev,
                localGovernment: '', // Reset LGA when state changes
              }));
            }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select a state</option>
            {Object.keys(stateLGAMap).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Local Government */}
        <div className="mb-4">
          <label htmlFor="localGovernment" className="block text-gray-700 font-semibold mb-2">
            Local Government
          </label>
          <select
            id="localGovernment"
            name="localGovernment"
            value={formData.localGovernment}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select a local government</option>
            {formData.state &&
              stateLGAMap[formData.state]?.map((localGov) => (
                <option key={localGov} value={localGov}>
                  {localGov}
                </option>
              ))}
          </select>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
            Price (N) (per year)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., 500000"
            required
          />
        </div>

        {/* Bedrooms */}
        <div className="mb-4">
          <label htmlFor="bedrooms" className="block text-gray-700 font-semibold mb-2">
            Bedrooms
          </label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            min="1"
            required
          />
        </div>

        {/* Bathrooms */}
        <div className="mb-4">
          <label htmlFor="bathrooms" className="block text-gray-700 font-semibold mb-2">
            Bathrooms
          </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            min="1"
            required
          />
        </div>

        {/* Area */}
        <div className="mb-4">
          <label htmlFor="area" className="block text-gray-700 font-semibold mb-2">
            Area (sq ft)
          </label>
          <input
            type="number"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="images" className="block text-gray-700 font-semibold mb-2">
            Upload Images (Max 4)
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="flex space-x-4 mt-2">
            {previews.map((src, index) => (
              <img key={index} src={src} alt={`preview ${index}`} className="w-16 h-16 object-cover rounded-lg" />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default AddHouse;
