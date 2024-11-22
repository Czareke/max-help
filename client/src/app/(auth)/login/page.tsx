    "use client";

    import React, { useState } from "react";
    import { MaxHelp } from "@/components/store/icon";
    import { useRouter } from "next/navigation";

    const Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
                const response = await fetch("http://localhost:5000/api/v1/auth/login", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });
                
        if (!response.ok) {
            throw new Error("Invalid credentials. Please try again.");
        }

        const data = await response.json();
        setSuccessMessage(`Welcome, ${data.username}!`);
        
        // Navigate to the product page after successful login
        router.push("/product");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
        setErrorMessage(error.message || "An error occurred. Please try again.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto py-14">
        <div className="w-full">
            {/* Header */}
            <div className="flex w-5/6 mx-auto items-center">
            <p className="text-lg font-bold">
                <MaxHelp className="inline" /> MaxHelp
            </p>
            <div className="ml-auto">
                <button className="border text-sm border-blue-600 text-blue-600 px-4 py-2 rounded-md">
                Sign up for free
                </button>
            </div>
            </div>

            {/* Login Form */}
            <form
            onSubmit={handleLogin}
            className="mt-12 shadow-xl rounded-lg w-5/6 mx-auto py-12 bg-white"
            >
            <div className="w-5/6 mx-auto">
                <p className="text-2xl py-2 font-semibold">Log in</p>
                <p className="text-sm text-gray-600">Continue to MaxHelp</p>
            </div>

            {/* Display Error or Success Message */}
            {errorMessage && (
                <p className="text-red-500 text-sm mt-4 w-5/6 mx-auto">
                {errorMessage}
                </p>
            )}
            {successMessage && (
                <p className="text-green-500 text-sm mt-4 w-5/6 mx-auto">
                {successMessage}
                </p>
            )}

            {/* Email Field */}
            <div className="w-5/6 mx-auto pt-8">
                <label htmlFor="email" className="mb-2 text-sm font-medium">
                Email
                </label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                required
                />
            </div>

            {/* Password Field */}
            <div className="w-5/6 mx-auto mt-8">
                <label htmlFor="password" className="mb-2 text-sm font-medium">
                Password
                </label>
                <div className="relative">
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                />
                </div>
            </div>

            {/* Login Button */}
            <button
                type="submit"
                disabled={loading}
                className={`w-5/6 flex justify-center items-center mx-auto text-white py-3 mt-8 rounded-md ${
                loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                } transition duration-200`}
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            {/* Sign-Up Redirect */}
            <div className="w-5/6 mx-auto text-sm text-center mt-6">
                <p>
                Don&apos;t have an account?{" "}
                <a
                    href="/signup"
                    className="text-blue-600 hover:underline transition duration-200"
                >
                    Sign up
                </a>
                </p>
            </div>
            </form>
        </div>
        </div>
    );
    };

    export default Page;