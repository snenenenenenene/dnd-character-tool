"use client";
import { useSheetStore } from "@/app/utils/store";
import Link from "next/link";
import React from "react";
import { GiDiceEightFacesEight, GiFlamingSheet } from "react-icons/gi";
export const Sidebar = () => {
  const routes = [
    {
      title: "Sheet Tool",
      icon: <GiFlamingSheet />,
      route: "/sheets",
    },
    {
      title: "DM's Vault",
      icon: <GiDiceEightFacesEight />,
      route: "/vault",
    },
  ];

  return (
    <nav className="w-20 h-full fixed bg-light-primary flex flex-col drop-shadow-2xl text-light-secondary">
      {/* <h1 className=" text-3xl font-bold mx-auto text-center"></h1> */}
      <section className="flex w-full h-full flex-col ">
        {routes.map((route) => (
          <Link
            className="w-full h-20 flex hover:bg-light-secondary transition-all hover:text-light-primary justify-center text-4xl items-center text-white"
            href={route.route}
            key={route.title}
          >
            {route.icon}
          </Link>
        ))}
      </section>
      <section>
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mx-4 mb-3 "></div>
      </section>
    </nav>
  );
};
