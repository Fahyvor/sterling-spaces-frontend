import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Home from '../assets/apartment1.jpeg';
import { API_URL } from '../apiUrl';
import axios from 'axios';

type Property = {
  id: string;
  title: string;
  images: string;
  description: string;
  location: string;
  price: string;
  state: string;
  localGovt: string;
  bedrooms: string;
  bathrooms: string;
  area: string; // in sq ft
};

// Mock data for demonstration purposes
// const properties: Property[] = [
//   {
//     id: 1,
//     name: 'Modern Apartment',
//     imageUrl: Home,
//     description: 'A beautiful modern apartment with spacious rooms and stunning city views.',
//     location: 'New York',
//     price: 1200,
//     bedrooms: 2,
//     bathrooms: 2,
//     area: 900,
//   },
//   // Add more property objects as needed
// ];

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  console.log("Property ID:", id);

  useEffect(() => {
    console.log("Fetching property...");
    console.log("API URL:", API_URL);
    console.log("Property ID:", id);
  }, [id]);

  const [singleProperty, setSingleProperty] = useState<Property | null>(null);

  console.log(API_URL)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        console.log("Fetching property with ID:", id);
        const response = await axios.get(`${API_URL}/property/${id}`);
        console.log("Response status:", response.status);
        if (response.status === 200) {
          console.log("Data received:", response.data);
          setSingleProperty(response.data);
        }
      } catch (error) {
        console.error("Couldn't fetch property", error);
      }
    };
  
    fetchProperty();
  }, [id]);  

  if (!singleProperty) {
    return <p className="text-center mt-10 text-gray-500">Property not found</p>;
  }

  return (
    <div className="flex flex-col items-center py-8 px-4 pt-16 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        {/* Property Image */}
        <img
          src={singleProperty.images[0]}
          alt={singleProperty.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        {/* Property Details */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{singleProperty.title}</h1>
          <p className="text-gray-600 mb-4">{singleProperty.location}</p>
          <p className="text-gray-800 text-lg mb-4">{singleProperty.description}</p>
          <p className="text-xl font-semibold text-green-600 mb-4">${singleProperty.price} / month</p>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-lg font-bold">{singleProperty.bedrooms}</p>
            <p className="text-gray-600">Bedrooms</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-lg font-bold">{singleProperty.bathrooms}</p>
            <p className="text-gray-600">Bathrooms</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-lg font-bold">{singleProperty.area} sq ft</p>
            <p className="text-gray-600">Area</p>
          </div>
        </div>

        {/* Contact Button */}
        <div className="mt-8 text-center">
          <button
            className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Contact Owner
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
