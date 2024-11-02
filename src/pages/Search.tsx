import React, { useState, useEffect } from 'react';
// import apartment1 from '../assets/apartment1.jpeg';
// import apartment2 from '../assets/apartment2.jpeg';
// import heroImage from '../assets/hero.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../apiUrl';

interface Listing {
  id: number;
  title: string;
  address: string;
  price: number;
  images: string;
  localGovt: string;
  state: string;
}

const stateLGAMap: Record<string, string[]> = {
  "Rivers": [
    "Abua-Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", "Andoni", "Asari-Toru", "Bonny", "Degema", "Eleme", "Emohua", "Etche", "Gokana", "Ikwerre", "Khana", "Obio-Akpor", "Ogba–Egbema–Ndoni", "Ogu–Bolo", "Okrika", "Omuma", "Opobo–Nkoro", "Oyigbo", "Port Harcourt", "Tai"
  ],
  // Add other states and their LGAs here
};

const nigerianStates = Object.keys(stateLGAMap);

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(0);
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredItems, setFilteredItems] = useState<Listing[]>([]);
  const [availableLGAs, setAvailableLGAs] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLocationFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocationFilter(e.target.value);
  };

  const handleStateFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;
    setStateFilter(selectedState);
    setAvailableLGAs(stateLGAMap[selectedState] || []);
    setLocationFilter(''); // Reset location filter when state changes
  };

  const handleMinPriceFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPriceFilter(Number(e.target.value));
  };

  const handleMaxPriceFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPriceFilter(Number(e.target.value));
  };

  const filterItems = () => {
    const results = listings.filter((listing: Listing) => {
      return (
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (locationFilter === '' || listing.localGovt.includes(locationFilter)) &&
        (stateFilter === '' || listing.state.includes(stateFilter)) &&
        (minPriceFilter === 0 || listing.price >= minPriceFilter) &&
        (maxPriceFilter === 0 || listing.price <= maxPriceFilter)
      );
    });
    setFilteredItems(results);
  };

  useEffect(() => {
    filterItems();
  }, [searchQuery, locationFilter, stateFilter, minPriceFilter, maxPriceFilter]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/properties/all-properties`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          }
        });
        console.log(response.data);
        // Assuming response.data is an array of listings
        setFilteredItems(response.data);
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="flex flex-col pt-20 items-center py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Find Your Perfect Rental</h1>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full max-w-md px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      
      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        {/* State Filter */}
        <select
          value={stateFilter}
          onChange={handleStateFilterChange}
          className="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">State</option>
          {nigerianStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* Location Filter */}
        <select
          value={locationFilter}
          onChange={handleLocationFilterChange}
          className="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Local Government Area</option>
          {availableLGAs.map((lga) => (
            <option key={lga} value={lga}>
              {lga}
            </option>
          ))}
        </select>
        
        {/* Min Price Filter */}
        <input
          type="number"
          placeholder="Min Price"
          value={minPriceFilter}
          onChange={handleMinPriceFilterChange}
          className="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Max Price Filter */}
        <input
          type="number"
          placeholder="Max Price"
          value={maxPriceFilter}
          onChange={handleMaxPriceFilterChange}
          className="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      
      {/* Items Display */}
      <div className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-8">Available Houses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredItems.map(listing => (
              <div
                key={listing.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{listing.title}</h3>
                  <p className="text-gray-600">{listing.address}</p>
                  <p className='font-semibold'>L.G.A: {listing.localGovt}</p>
                  <p className='font-semibold'>State: {listing.state}</p>
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

      {/* No Results Message */}
      {filteredItems.length === 0 && (
        <p className="text-gray-500 mt-6">No items found. Please wait a little.</p>
      )}
    </div>
  );
};

export default Search;
