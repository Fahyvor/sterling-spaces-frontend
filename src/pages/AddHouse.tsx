import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../apiUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CameraImage from '../assets/camera.png';

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
  };

  const [formData, setFormData] = useState<HouseInput>({
    title: '',
    description: '',
    address: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: [],
    localGovernment: '',
    state: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [previews, setPreviews] = useState<string[]>([]);
  // const [selectedFileNames, setSelectedFileNames] = useState<string[]>(Array.from({ length: 5 }, () => ""));
  const [selectedFiles, setSelectedFiles] = useState<Array<File | null>>([null, null, null, null, null]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' || name === 'area' ? +value : value,
    }));
  };

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const files = Array.from(e.target.files).slice(0, 4); // Limit to 4 images
  //     setFormData((prev) => ({ ...prev, images: files }));
  
  //     const newPreviews = files.map((file) => URL.createObjectURL(file));
  //     setPreviews(newPreviews);
  //   }
  // };

  const handleImageChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index] = file;
    setSelectedFiles(newSelectedFiles);

    setFormData((prevFormData) => ({
        ...prevFormData,
        images: newSelectedFiles.filter((file) => file !== null) 
    }));
  
    console.log('file changed at index', index, file);
    console.log('Updated selectedFiles', newSelectedFiles);
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  let userData;
  let userId;
  let token;
  
  try {
    const storedData = localStorage.getItem("userData");
    token = localStorage.getItem('userToken');
    if (storedData) {
      userData = JSON.parse(storedData);
      userId = userData.id;
      console.log(userData.id)
    } else {
      userData = null; // or set a default value
    }
  } catch (error) {
    console.error("Error parsing userData from localStorage:", error);
    userData = null; // or set a default value
    console.log(userData)
  }

  const formDataToSend = new FormData();
  formDataToSend.append('title', formData.title);
  formDataToSend.append('userId', userId);
  formDataToSend.append('description', formData.description);
  formDataToSend.append('address', formData.address);
  formDataToSend.append('price', formData.price.toString());
  formDataToSend.append('bedrooms', formData.bedrooms.toString());
  formDataToSend.append('bathrooms', formData.bathrooms.toString());
  formDataToSend.append('area', formData.area.toString());
  formDataToSend.append('localGovt', formData.localGovernment);
  formDataToSend.append('state', formData.state);

  formData.images.forEach((image) => {
    formDataToSend.append('images', image);
  });

  try {
    const response = await axios.post(
      `${API_URL}/api/properties/add-property`,
      formDataToSend,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (response && response.status === 201) {
      toast.success("House Successfully Created");
    }
    window.location.href="/"
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message || "An error occurred while creating the house");
      console.log(error)
    } else {
      toast.error("An unexpected error occurred");
    }
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="lg:w-1/2 md:w-1/2 w-[90%] pt-16 mx-auto py-8">
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
            <div className="upload_images_container flex gap-4">
              {selectedFiles[0] ? (
                <div
                  className="w-1/2 flex items-center justify-center"
                  style={{
                    backgroundImage: selectedFiles[0]
                      ? `url(${URL.createObjectURL(selectedFiles[0])})`
                      : 'none',
                  }}
                >
                  <label htmlFor={`file${0}`} className="upload_image overflow-hidden">
                    <div>
                      <div className="w-full">
                        <img
                          src={URL.createObjectURL(selectedFiles[0])}
                          alt="img"
                          width={50}
                          height={50}
                          className="object-cover w-full"
                        />
                      </div>
                      <input
                        type="file"
                        id={`file${0}`}
                        className="hidden"
                        onChange={(e) => handleImageChange(0)(e)}
                      />
                    </div>
                  </label>
                </div>
              ) : (
                // <div className="upload_img_left w-1/2 flex items-center justify-center py-32">
                //   <label htmlFor={`file${0}`} className="upload_img">
                //     <input
                //       type="file"
                //       id={`file${0}`}
                //       className="hidden"
                //       onChange={(e) => handleImageChange(0)(e)}
                //     />
                //     <img src={CameraImage} alt="" width={40} height={40} />
                //   </label>
                //   {selectedFiles[0] 
                //   // &&   <p>{selectedFiles[0].name}</p>
                //   }

                // </div>
                <div>

                </div>
              )}

              <div className="upload_img_right grid lg:grid-cols-2 w-full gap-3">
                {[1, 2, 3, 4].map((index) => (
                  <label
                    key={index}
                    htmlFor={`file${index + 1}`}
                    className="upload_img flex justify-center items-center cursor-pointer"
                  >
                    <input
                      type="file"
                      id={`file${index + 1}`}
                      className="hidden"
                      onChange={handleImageChange(index)}
                    />
                    {!selectedFiles[index] && (
                      <img src={CameraImage} alt="" width={40} height={40} />
                    )}
                    {selectedFiles[index] && (
                      <div className="w-full">
                        <img
                          src={URL.createObjectURL(selectedFiles[index])}
                          alt="img"
                          width={80}
                          height={80}
                          className="w-full"
                        />
                        <p>{selectedFiles[index]?.name}</p>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Property...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default AddHouse;
