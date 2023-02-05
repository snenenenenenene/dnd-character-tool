import Link from "next/link";
import React from "react";

export const Sidebar = () => {
  const routes = [
    {
      title: "Create",
      route: "/create",
    },
    {
      title: "Sheets",
      route: "/sheets",
    },
  ];

  return (
    <nav className="w-96 h-full bg-light-primary flex flex-col py-6 drop-shadow-2xl text-light-secondary">
      <h1 className=" text-3xl font-bold mx-auto text-center">
        Dungeon Crafter
      </h1>
      <section className="flex w-full h-full flex-col my-8 ">
        {routes.map((route) => (
          <Link
            className="w-full h-14 flex px-10 hover:bg-light-secondary transition-all hover:text-light-primary items-center"
            href={route.route}
            key={route.title}
          >
            <p>{route.title}</p>
          </Link>
        ))}
      </section>
      <section>
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mx-4 "></div>
      </section>
    </nav>
  );
};
