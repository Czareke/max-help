'use client';
import React, { useState, useEffect } from 'react';

interface Catalogue {
  id: string; // Match backend's ID type
  name: string;
  description: string;
  image: string;
}

const Page: React.FC = () => {
  // State to manage catalogues
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch catalogues from backend
  useEffect(() => {
    const fetchCatalogues = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/catalogues'); // Use correct backend URL
        console.log('Response object:', response); // Debug log to inspect the response object

        if (!response.ok) {
          throw new Error(`Failed to fetch catalogues: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Debug log for the response JSON
        setCatalogues(data.data.catalogs);
      } catch (error) {
        console.error('Error while fetching catalogues:', error); // Debug error log
      }
    };

    fetchCatalogues();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    if (formData.image) formDataToSend.append('image', formData.image);

    try {
      if (isEditing && editingId) {
        // Update catalogue
        const response = await fetch(`http://localhost:5000/api/v1/catalogues/${editingId}`, {
          method: 'PATCH',
          body: formDataToSend,
        });
        if (!response.ok) throw new Error('Failed to update catalogue');
        const updatedCatalogue = await response.json();

        setCatalogues((prev) =>
          prev.map((cat) => (cat.id === editingId ? updatedCatalogue.data.catalog : cat))
        );
        setIsEditing(false);
        setEditingId(null);
      } else {
        // Create new catalogue
        const response = await fetch('http://localhost:5000/api/v1/catalogues', {
          method: 'POST',
          body: formDataToSend,
        });
        console.log('POST Response:', response); // Debug log for create response
        if (!response.ok) throw new Error('Failed to create catalogue');
        const newCatalogue = await response.json();
        console.log('Created catalogue:', newCatalogue); // Debug log for created data

        setCatalogues((prev) => [...prev, newCatalogue.data.catalog]);
      }
      setFormData({ name: '', description: '', image: '' });
    } catch (error) {
      console.error('Error during form submission:', error); // Debug error log
    }
  };

  // Handle edit
  const handleEdit = (id: string) => {
    const catalogue = catalogues.find((cat) => cat.id === id);
    if (catalogue) {
      setFormData({ name: catalogue.name, description: catalogue.description, image: '' });
      setIsEditing(true);
      setEditingId(id);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/catalogues/${id}`, {
        method: 'DELETE',
      });
      console.log('DELETE Response:', response); // Debug log for delete response
      if (!response.ok) throw new Error('Failed to delete catalogue');
      setCatalogues((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error('Error while deleting catalogue:', error); // Debug error log
    }
  };

  return (
    <div className="ml-32 mt-12">
      <h1 className="text-2xl font-bold mb-4">Catalogue Management</h1>

      {/* Add/Edit Catalogue Form */}
      <form onSubmit={handleFormSubmit} className="bg-gray-100 p-4 rounded-md shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'Edit Catalogue' : 'Add New Catalogue'}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            rows={3}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="image">
            Image Upload
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          {isEditing ? 'Update Catalogue' : 'Add Catalogue'}
        </button>
      </form>

      {/* Catalogue List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Catalogues</h2>
        {catalogues.length === 0 ? (
          <p className="text-gray-500">No catalogues available.</p>
        ) : (
          <ul className="space-y-4">
            {catalogues.map((catalogue) => (
              <li
                key={catalogue.id}
                className="bg-white p-4 rounded-md shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-bold">{catalogue.name}</h3>
                  <p className="text-sm text-gray-600">{catalogue.description}</p>
                  {catalogue.image && (
                    <img
                      src={catalogue.image}
                      alt={catalogue.name}
                      className="w-16 h-16 object-cover rounded-md mt-2"
                    />
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(catalogue.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(catalogue.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;
