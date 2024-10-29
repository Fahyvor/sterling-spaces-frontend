import React, { useState } from 'react';

type Item = {
  id: number;
  name: string;
  location: string;
  price: number;
};

const items: Item[] = [
  { id: 1, name: 'Modern Apartment', location: 'New York', price: 1200 },
  { id: 2, name: 'Beach House', location: 'California', price: 2000 },
  { id: 3, name: 'Country Villa', location: 'Texas', price: 1500 },
  { id: 4, name: 'Studio Apartment', location: 'Chicago', price: 900 },
];

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState(0);
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLocationFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocationFilter(e.target.value);
  };

  const handlePriceFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilter(Number(e.target.value));
  };

  const filterItems = () => {
    const results = items.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (locationFilter === '' || item.location === locationFilter) &&
        (priceFilter === 0 || item.price <= priceFilter)
      );
    });
    setFilteredItems(results);
  };

  React.useEffect(() => {
    filterItems();
  }, [searchQuery, locationFilter, priceFilter]);

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
        {/* Location Filter */}
        <select
          value={locationFilter}
          onChange={handleLocationFilterChange}
          className="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Local Government Area</option>
          <option value="New York">New York</option>
          <option value="California">California</option>
          <option value="Texas">Texas</option>
          <option value="Chicago">Chicago</option>
          {/* Add more options as needed */}
        </select>
        
        {/* Price Filter */}
        <input
          type="number"
          placeholder="Max Price"
          value={priceFilter}
          onChange={handlePriceFilterChange}
          className="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      
      {/* Items Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {filteredItems.map((item) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600">Location: {item.location}</p>
            <p className="text-gray-600">Price: ${item.price}</p>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredItems.length === 0 && (
        <p className="text-gray-500 mt-6">No items found. Try adjusting your filters.</p>
      )}
    </div>
  );
};

export default Search;
