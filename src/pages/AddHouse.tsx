import React, { useState } from 'react';

type HouseInput = {
  title: string;
  description: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: File[]; // Update images to hold multiple files
};

const AddHouse: React.FC = () => {
  const [formData, setFormData] = useState<HouseInput>({
    title: '',
    description: '',
    address: '',
    price: 0,
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    images: [],
  });

  const [previews, setPreviews] = useState<string[]>([]); // For image previews

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' || name === 'area' ? +value : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 4); // Limit to 4 images
      setFormData((prev) => ({ ...prev, images: files }));

      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews(newPreviews);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Add functionality to submit the form data to your backend API
  };

  return (
    <div className="w-1/2 pt-16 mx-auto py-8">
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
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
            Property Images (Max 4)
          </label>
          <input
            type="file"
            id="image"
            name="images"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg"
            multiple
            accept="image/*"
            required
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            {previews.map((preview, index) => (
              <img key={index} src={preview} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Submit Property
        </button>
      </form>
    </div>
  );
};

export default AddHouse;
