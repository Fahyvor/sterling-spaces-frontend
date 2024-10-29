import React from 'react';

// Import images
import apartment1 from '../assets/apartment1.jpeg';
import apartment2 from '../assets/apartment2.jpeg';
import heroImage from '../assets/hero.jpg';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom';


gsap.registerPlugin(ScrollTrigger)
interface Listing {
  id: number;
  title: string;
  address: string;
  price: number;
  image: string;
}

const listings: Listing[] = [
  { id: 1, title: "One Bedroom Apartment", address: "123 Airforce Road", price: 120000, image: apartment1 },
  { id: 2, title: "Self Contain Apartment", address: "23 Ogbunabali Road,", price: 150000, image: apartment2 },
  { id: 3, title: "Two Bedroom Apartment", address: "238 Trans Amadi Industrial Layout  ", price: 200000, image: heroImage },
  { id: 4, title: "One Bedroom Apartment", address: "123 Airforce Road", price: 120000, image: apartment1 },
  { id: 5, title: "Self Contain Apartment", address: "23 Ogbunabali Road,", price: 150000, image: apartment2 },
  { id: 6, title: "Two Bedroom Apartment", address: "238 Trans Amadi Industrial Layout  ", price: 200000, image: heroImage },
  { id: 7, title: "One Bedroom Apartment", address: "123 Airforce Road", price: 120000, image: apartment1 },
  { id: 8, title: "Self Contain Apartment", address: "23 Ogbunabali Road,", price: 150000, image: apartment2 },
  { id: 9, title: "Two Bedroom Apartment", address: "238 Trans Amadi Industrial Layout  ", price: 200000, image: heroImage },
];

const Home: React.FC = () => {
  return (
    <div className=" bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center bg-no-repeat h-96 flex items-center justify-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-black opacity-30"></div> {/* This is the overlay */}
        <div className="relative bg-black bg-opacity-50 text-white p-8 rounded-lg text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Rental Home</h1>
            <p className="text-lg mb-6">Discover homes for rent across the Rivers State</p>
            <a href="/search" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full">Get Started</a>
        </div>
        </div>

      {/* Search Bar */}
      <div id="search" className="py-8 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col md:flex-row gap-4 items-center justify-between">
            <input
              type="text"
              placeholder="Local Government Area"
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Price Range"
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">Search</button>
          </div>
        </div>
      </div>

      {/* Popular Listings */}
      <div className="py-12">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-semibold mb-8">Available Houses</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {listings.map(listing => (
                    <div
                    key={listing.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
                    >
                    <img
                        src={listing.image}
                        alt={listing.title}
                        className="h-48 w-full object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-xl font-bold">{listing.title}</h3>
                        <p className="text-gray-600">{listing.address}</p>
                        <p className="text-green-600 font-semibold mt-2">
                        N{listing.price}/year
                        </p>
                        <Link to={`/property/${listing.id}`}>
                        <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                            View Details
                        </button>
                        </Link>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>

      {/* Promotional Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">Easy Rentals, Hassle-Free Living</h2>
          <p className="text-lg mb-8">Our platform makes it easy to find and rent homes across the state.</p>
          <a href="/about" className="bg-white text-green-600 hover:bg-gray-200 font-bold py-2 px-6 rounded-full">Learn More</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
