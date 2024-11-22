"use client";

import React from "react";
import Table from "@/components/store/table";

const Page = () => {
  return (
    <div className="ml-24 pt-8">
      {/* Header Filters */}
      <div className="flex items-center space-x-10">
        <div className="border border-blue-600 text-blue-600 flex">
          <p className="py-1 px-2 bg-blue-600 text-white">7 days</p>
          <p className="py-1 px-2 border border-r-blue-600">30 days</p>
          <p className="py-1 px-2 border border-r-blue-600">90 days</p>
          <p className="py-1 px-2">Custom Date Range</p>
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="inactive" id="inactive" />
          <p className="pl-2">Show inactive products</p>
        </div>
        <div className="flex space-x-3">
          <button className="text-xs border border-blue-600 text-blue-600 py-1 px-4 rounded-sm">
            Filter
          </button>
          <button className="text-xs bg-blue-600 text-white py-1 px-4 rounded-sm">
            Export
          </button>
        </div>
      </div>
      {/* Product Table */}
      <Table />
    </div>
  );
};

export default Page;
