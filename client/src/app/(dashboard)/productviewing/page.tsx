"use client";

import React, { useState } from "react";

const UserProductPage = () => {
  const [products] = useState([
    { id: 1, name: "Product A", price: 20, stock: 50, category: "Category 1" },
    { id: 2, name: "Product B", price: 15, stock: 0, category: "Category 2" },
  ]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterCategory ? product.category === filterCategory : true)
    );
  });

  return (
    <div className="ml-32 mt-10">
      <h1 className="text-xl font-bold mb-4">Products</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded p-4 shadow-sm flex flex-col items-center text-center"
          >
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-500 mb-2">${product.price}</p>
            {product.stock > 0 ? (
              <p className="text-green-600">In Stock</p>
            ) : (
              <p className="text-red-600">Out of Stock</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProductPage;
