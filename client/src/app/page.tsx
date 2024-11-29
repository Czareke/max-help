"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/signup"); // Redirects to the signup page after a delay
    }, 5000); // 5-second delay

    return () => clearTimeout(timer); // Clean up the timer
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-white text-gray-800">
      <h1 className="text-4xl font-semibold mb-4">Max Help System</h1>
      <h1 className="text-5xl font-bold animate-pulse">Welcome to Our Management Platform!</h1>
      <p className="mt-4 text-lg">Redirecting you to the signup page in a moment...</p>
      
      <div className="flex space-x-4 mt-6">
        <Link
          href="/signup"
          className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go to Signup Now
        </Link>
        <Link
          href="/product"
          className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Explore Products
        </Link>
      </div>

      <footer className="absolute bottom-4 text-sm text-gray-500">
        Need help? <Link href="/support" className="underline hover:text-gray-700">Contact Support</Link>
      </footer>
    </div>
  );
}
