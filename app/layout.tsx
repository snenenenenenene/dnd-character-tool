import { Sidebar } from "./components/common/Sidebar";
import "./globals.css";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen w-screen bg-light-secondary text-light-primary flex">
        <Sidebar />
        <div className="w-full h-full px-12 py-8 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
