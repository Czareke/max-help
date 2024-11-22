"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const email = searchParams.get("email");

  const [userData, setUserData] = useState({
    username: username || "",
    email: email || "",
  });

  useEffect(() => {
    // Update state if searchParams change
    setUserData({
      username: username || "",
      email: email || "",
    });
  }, [username, email]);

  return (
    <div className="ml-32 mt-12">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-4">Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default Page;