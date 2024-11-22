"use client";
import React from "react";
import SideBar from "@/components/store/sideBar";
import Top from "@/components/store/top";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="w-full h-[97%] p-1">
        <Top/>
        <div className="flex">
        <div className="fixed top-[7dvh] left-0 bottom-auto"><SideBar/></div>
          <main className="rounded mt-[4dvh]">
              {children}
          </main>
        </div>
    </div>
  );
}

export default DashboardLayout;