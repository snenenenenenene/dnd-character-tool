/* eslint-disable react/jsx-no-undef */
"use client";
import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Sidebar } from "./components/common/Sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen w-screen bg-light-primary dark:bg-dark-primary dark:text-dark-secondary text-light-secondary flex">
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          limit={1}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
        />
        <Sidebar />
        <div className="w-full h-full pl-20 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
