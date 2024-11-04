import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../apiUrl';
import axios from 'axios';

type Property = {
  id: string;
  title: string;
  images: string[]; // Changed to array
  description: string;
  address: string;
  price: string;
  state: string;
  localGovt: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  userId: string;
};

type User = {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  address: string;
  role: string;
};

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [singleProperty, setSingleProperty] = useState<Property | null>(null);
  const [showOwner, setShowOwner] = useState(false);
  const [ownerData, setOwnerData] = useState<User | null>(null);
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        console.log("Fetching property...");
        const response = await axios.get(`${API_URL}/api/properties/property/${id}`);
        console.log("API Response:", response);
        if (response.status === 200) {
          console.log("Property Data:", response.data);
          setSingleProperty(response.data);
          setUserId(response.data.userId);
        } else {
          console.warn("Unexpected response status:", response.status);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.error("Property not found");
        } else {
          console.error("Couldn't fetch property", error);
        }
      }
    };

    fetchProperty();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await axios.get(`${API_URL}/api/auth/single-user/${userId}`);

        if (userData.status === 200) {
          console.log(userData.data.user);
          setOwnerData(userData.data.user);
        }

      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]);

  if (!singleProperty) {
    return <p className="text-center mt-10 text-gray-500">Property not found</p>;
  }

  return (
    <div className="flex flex-col items-center py-8 px-4 pt-16 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <img
          src={singleProperty.images[0]}
          alt={singleProperty.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-3 w-full'>
          <img src={singleProperty.images[1]}
            alt={singleProperty.title}
            className="w-full h-64 object-cover rounded-lg mb-6" />

          <img src={singleProperty.images[2]}
            alt={singleProperty.title}
            className="w-full h-64 object-cover rounded-lg mb-6" />

          <img src={singleProperty.images[3]}
            alt={singleProperty.title}
            className="w-full h-64 object-cover rounded-lg mb-6" />
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{singleProperty.title}</h1>
          <p className="text-gray-600 ">{singleProperty.address}</p>
          <p className="text-gray-900 font-semibold text-xl">{singleProperty.localGovt} Local Government Area, {singleProperty.state} State</p>
          <p className="text-gray-800 text-lg mb-4">{singleProperty.description}</p>
          <p className="text-xl font-semibold text-green-600 mb-4">${singleProperty.price} / month</p>
        </div>

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

        <div className="mt-8 text-center">
          <div
            className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
            onClick={() => setShowOwner(!showOwner)}
          >
            {showOwner ? 'Hide Contact' : 'Contact Owner'}
          </div>

          {showOwner ?
            <div className='flex flex-col gap-2 text-left py-5'>
              <p className='text-xl font-bold uppercase'>Contact Details</p>
              <p className='font-semibold'>Name: <span className='font-normal'>{ownerData?.fullName}</span></p>
              <p className='font-semibold'>Phone Number: <span className='font-normal'>{ownerData?.phone}</span></p>
            </div>
            : null}

        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
