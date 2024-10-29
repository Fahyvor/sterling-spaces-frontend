import React from 'react';
import { useParams } from 'react-router-dom';
import Home from '../assets/apartment1.jpeg'

type Property = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number; // in sq ft
};

// Mock data for demonstration purposes
const properties: Property[] = [
  {
    id: 1,
    name: 'Modern Apartment',
    imageUrl: Home,
    description: 'A beautiful modern apartment with spacious rooms and stunning city views.',
    location: 'New York',
    price: 1200,
    bedrooms: 2,
    bathrooms: 2,
    area: 900,
  },
  // Add more property objects as needed
];

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === parseInt(id || '', 10));

  if (!property) {
    return <p className="text-center mt-10 text-gray-500">Property not found</p>;
  }

  return (
    <div className="flex flex-col items-center py-8 px-4 pt-16 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        {/* Property Image */}
        <img
          src={property.imageUrl}
          alt={property.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        {/* Property Details */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
          <p className="text-gray-600 mb-4">{property.location}</p>
          <p className="text-gray-800 text-lg mb-4">{property.description}</p>
          <p className="text-xl font-semibold text-green-600 mb-4">${property.price} / month</p>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-lg font-bold">{property.bedrooms}</p>
            <p className="text-gray-600">Bedrooms</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-lg font-bold">{property.bathrooms}</p>
            <p className="text-gray-600">Bathrooms</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-lg font-bold">{property.area} sq ft</p>
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
