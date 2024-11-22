"use client";

import React, { useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const AdminProductManagement = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product A", price: 20, stock: 50, category: "Category 1" },
    { id: 2, name: "Product B", price: 15, stock: 5, category: "Category 2" },
  ]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null,
  });
  const [editing, setEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setProducts(products.map((p) => (p.id === form.id ? form : p)));
    } else {
      setProducts([...products, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, name: "", description: "", price: "", stock: "", category: "", image: null });
    setEditing(false);
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditing(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="ml-32 mt-10">
      <h1 className="text-xl font-bold mb-4">Admin Product Management</h1>

      <form onSubmit={handleFormSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleInputChange}
            className="border p-2 rounded col-span-2"
          />
          <input type="file" onChange={handleImageChange} className="border p-2 rounded col-span-2" />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          {editing ? "Update Product" : "Add Product"}
        </button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className={product.stock < 10 ? "bg-red-100" : ""}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminProductManagement;
