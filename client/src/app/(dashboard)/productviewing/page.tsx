"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProductPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products");
            setProducts(response.data.data.products);
        } catch (error) {
            console.error("Error fetching products:", error.response?.data || error.message);
        }
    };
    fetchProducts();
}, []);


  // Handle adding a new product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding product:", newProduct); // Log before sending request

    try {
        const response = await axios.post("http://localhost:5000/api/products", newProduct);
        setProducts((prev) => [...prev, response.data.data.product]);
        setNewProduct({ name: "", price: "", stock: "", category: "" }); // Reset form
    } catch (error) {
        console.error("Error adding product:", error.response?.data || error.message); // Improved logging
    }
};


  // Filter products based on search and category
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

      <form onSubmit={handleAddProduct} className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default UserProductPage;
