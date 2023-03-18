/* eslint-disable no-unused-vars */
"use client";
import { useSheetStore } from "@/app/utils/store";
import { applyThemePreference } from "@/app/utils/themeUtils";
import Link from "next/link";
import { useEffect } from "react";
import {
  GiDiceEightFacesEight,
  GiFlamingSheet,
  GiMoon,
  GiSun,
} from "react-icons/gi";

interface SidebarArgs {
  setShowAuthModal: (showAuthModal: any) => any;
}
export const Sidebar = ({ setShowAuthModal }: SidebarArgs) => {
  const theme = useSheetStore((state) => state.theme);
  const toggleTheme = useSheetStore((state) => state.toggleTheme);

  useEffect(() => {
    applyThemePreference(theme);
  }, [theme]);

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
    <nav className="w-20 h-full fixed bg-light-primary dark:bg-dark-primary dark:bg-text-secondary flex flex-col text-light-secondary border-r-2 border-light-secondary dark:border-dark-secondary">
      {/* <h1 className=" text-3xl font-bold mx-auto text-center"></h1> */}
      <section className="flex w-full h-full flex-col ">
        {routes.map((route) => (
          <Link
            className="w-full h-20 flex hover:bg-light-secondary hover:dark:bg-dark-secondary transition-all hover:text-light-primary justify-center text-4xl items-center  hover:dark:text-dark-primary dark:text-dark-secondary text-light-secondary"
            href={route.route}
            key={route.title}
          >
            {route.icon}
          </Link>
        ))}
      </section>
      <section>
        <button
          className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mx-4 mb-3 "
          onClick={() =>
            setShowAuthModal((showAuthModal: any) => !showAuthModal)
          }
        />
      </section>
      <section>
        <button
          className="w-12 h-12 rounded-full bg-gradient-to-r flex text-light-primary dark:text-dark-primary  justify-center items-center text-4xl from-cyan-500 to-blue-500 dark:from-red-500 dark:to-orange-500 mx-4 mb-3 "
          onClick={() => toggleTheme()}
        >
          {theme === "light" ? <GiSun /> : <GiMoon />}
        </button>
      </section>
    </nav>
  );
};
