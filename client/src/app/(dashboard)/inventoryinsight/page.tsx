'use client'
import React, { useState } from 'react';

interface Catalogue {
  id: number;
  name: string;
  description: string;
  image: string;
}

const cataloguesData: Catalogue[] = [
  { id: 1, name: 'Catalogue A', description: 'Description for Catalogue A', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Catalogue B', description: 'Description for Catalogue B', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Catalogue C', description: 'Description for Catalogue C', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Catalogue D', description: 'Description for Catalogue D', image: 'https://via.placeholder.com/150' },
];

const Page: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCatalogues, setFilteredCatalogues] = useState<Catalogue[]>(cataloguesData);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = cataloguesData.filter(
      (catalogue) =>
        catalogue.name.toLowerCase().includes(value) ||
        catalogue.description.toLowerCase().includes(value)
    );
    setFilteredCatalogues(filtered);
  };

  return (
    <div className="ml-32 mt-12">
      <h1 className="text-2xl font-bold mb-4">Catalogue Viewer</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search catalogues..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
      </div>

      {/* Catalogue Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCatalogues.length > 0 ? (
          filteredCatalogues.map((catalogue) => (
            <div
              key={catalogue.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
            >
              <img
                src={catalogue.image}
                alt={catalogue.name}
                className="w-32 h-32 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-bold mb-2">{catalogue.name}</h2>
              <p className="text-sm text-gray-600 text-center">{catalogue.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No catalogues found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
