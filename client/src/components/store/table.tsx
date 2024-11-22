"use client";

import React from "react";
import {
  Table as CustomTable,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableCaption,
} from "@/components/ui/table";

// Define the type for the product data
type Product = {
  productName: string;
  sku: string;
  method: string;
  datePublished: string;
  stock: number;
  price: string;
  margin: string;
  returnRate: string;
  atc: string;
  cvr: string;
  purchases: number;
  impression: number;
};

// Array of product objects
const productData: Product[] = [
  {
    productName: "Orange Shirt",
    sku: "SC123",
    method: "Credit Card",
    datePublished: "05.07.2022",
    stock: 200,
    price: "$25.00",
    margin: "2.5",
    returnRate: "38.6%",
    atc: "13.11%",
    cvr: "5.9%",
    purchases: 12,
    impression: 2670,
  },
  {
    productName: "Blue Jeans",
    sku: "BJ456",
    method: "Debit Card",
    datePublished: "06.08.2022",
    stock: 150,
    price: "$40.00",
    margin: "3.2",
    returnRate: "30.2%",
    atc: "15.21%",
    cvr: "6.5%",
    purchases: 20,
    impression: 3450,
  },
  {
    productName: "Black Shoes",
    sku: "BS789",
    method: "Cash",
    datePublished: "10.05.2022",
    stock: 300,
    price: "$50.00",
    margin: "4.0",
    returnRate: "20.1%",
    atc: "10.43%",
    cvr: "7.0%",
    purchases: 30,
    impression: 5000,
  },
  {
    productName: "Red Cap",
    sku: "RC101",
    method: "Credit Card",
    datePublished: "12.11.2021",
    stock: 500,
    price: "$15.00",
    margin: "1.8",
    returnRate: "25.5%",
    atc: "11.32%",
    cvr: "5.5%",
    purchases: 40,
    impression: 4200,
  },
  {
    productName: "Green Scarf",
    sku: "GS202",
    method: "Debit Card",
    datePublished: "09.15.2021",
    stock: 220,
    price: "$18.00",
    margin: "2.1",
    returnRate: "28.4%",
    atc: "12.54%",
    cvr: "6.8%",
    purchases: 25,
    impression: 3900,
  },
  {
    productName: "Purple Hat",
    sku: "PH303",
    method: "Paypal",
    datePublished: "08.20.2023",
    stock: 180,
    price: "$20.00",
    margin: "2.9",
    returnRate: "35.8%",
    atc: "10.67%",
    cvr: "4.9%",
    purchases: 18,
    impression: 3600,
  },
  {
    productName: "Yellow Jacket",
    sku: "YJ404",
    method: "Credit Card",
    datePublished: "03.30.2023",
    stock: 100,
    price: "$60.00",
    margin: "5.0",
    returnRate: "40.0%",
    atc: "9.21%",
    cvr: "3.5%",
    purchases: 15,
    impression: 2800,
  },
  {
    productName: "White T-Shirt",
    sku: "WT505",
    method: "Cash",
    datePublished: "07.25.2022",
    stock: 320,
    price: "$12.00",
    margin: "1.5",
    returnRate: "18.2%",
    atc: "14.02%",
    cvr: "8.3%",
    purchases: 35,
    impression: 5100,
  },
  {
    productName: "Pink Sweater",
    sku: "PS606",
    method: "Debit Card",
    datePublished: "02.14.2022",
    stock: 90,
    price: "$45.00",
    margin: "3.8",
    returnRate: "22.6%",
    atc: "8.45%",
    cvr: "4.0%",
    purchases: 10,
    impression: 2300,
  },
  {
    productName: "Brown Boots",
    sku: "BB707",
    method: "Paypal",
    datePublished: "11.01.2023",
    stock: 400,
    price: "$70.00",
    margin: "6.0",
    returnRate: "10.5%",
    atc: "16.11%",
    cvr: "9.5%",
    purchases: 50,
    impression: 7000,
  },
];

const Table: React.FC = () => {
  return (
    <div className="pt-12 px-5">
      <CustomTable>
        <TableCaption>Product Metrics</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Date Published</TableHead>
            <TableHead className="text-right">Stock</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Margin</TableHead>
            <TableHead className="text-right">Return Rate</TableHead>
            <TableHead className="text-right">ATC</TableHead>
            <TableHead className="text-right">CVR</TableHead>
            <TableHead className="text-right">Purchases</TableHead>
            <TableHead className="text-right">Impression</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productData.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.method}</TableCell>
              <TableCell className="text-right">{product.datePublished}</TableCell>
              <TableCell className="text-right">{product.stock}</TableCell>
              <TableCell className="text-right">{product.price}</TableCell>
              <TableCell className="text-right">{product.margin}</TableCell>
              <TableCell className="text-right">{product.returnRate}</TableCell>
              <TableCell className="text-right">{product.atc}</TableCell>
              <TableCell className="text-right">{product.cvr}</TableCell>
              <TableCell className="text-right">{product.purchases}</TableCell>
              <TableCell className="text-right">{product.impression}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </CustomTable>
    </div>
  );
};

export default Table;
