'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MaxHelp } from '@/components/store/icon';
import Link from 'next/link';

const Page = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    rememberMe: false,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value.trim(),
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setMessage('All fields are required.');
      setIsError(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      setMessage('Signup successful! Redirecting to products page...');
      setIsError(false);

      if (formData.rememberMe) {
        // Save data to localStorage for persistent login
        localStorage.setItem('email', formData.email);
      }

      router.push('/product');
    } catch (error: any) {
      setMessage(error.message || 'An error occurred during signup.');
      setIsError(true);
    }
  };

  return (
    <div className="w-3/5 flex mx-auto py-14">
      <div className="w-full">
        <div className="flex w-5/6 mx-auto">
          <p>
            <MaxHelp className="inline" /> MaxHelp
          </p>
        </div>
        <form
          className="mt-16 shadow-xl w-2/3 mx-auto py-12"
          onSubmit={handleFormSubmit}
        >
          <div className="w-5/6 mx-auto">
            <p className="text-xl py-2 font-semibold">Sign Up</p>
            <p className="text-sm">Just a few steps to your online store</p>
          </div>

          <div className="w-5/6 mx-auto pt-12">
            <p className="mb-2 text-sm">Email</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="flex h-12 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm"
              required
            />

            <p className="text-sm mt-7">Password</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="flex h-12 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm"
              required
            />

            <p className="mb-2 text-sm mt-7">Username</p>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="flex h-12 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm"
              required
            />

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm">
                Remember Me
              </label>
            </div>
          </div>

          {message && (
            <div
              className={`mt-6 w-5/6 mx-auto text-sm py-2 px-4 rounded-md ${
                isError ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-600 w-5/6 flex justify-center items-center mx-auto text-white py-2 mt-8 rounded-md"
          >
            Sign Up
          </button>
        </form>

        <div className="w-2/3 mx-auto text-center mt-4">
          <p className="text-sm">
            Have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
