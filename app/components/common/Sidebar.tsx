/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
"use client";
import { useSheetStore } from "@/app/utils/store";
import { applyThemePreference } from "@/app/utils/themeUtils";
import Link from "next/link";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import {
  GiDiceEightFacesEight,
  GiFlamingSheet,
  GiMoon,
  GiSun,
} from "react-icons/gi";
import { toast } from "react-toastify";
import { Button } from "./Button";
import { Input } from "./Input";

export const Sidebar = () => {
  const theme = useSheetStore((state) => state.theme);
  const toggleTheme = useSheetStore((state) => state.toggleTheme);
  const user = useSheetStore((state) => state.user);

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [toggleSignUp, setToggleSignUp] = useState<boolean>(false);
  const setUser = useSheetStore((state) => state.setUser);
  const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);

  async function signup() {
    //use pocketbase and add user to db

    await pb
      .collection("users")
      .create({
        email: email,
        username: username,
        password: password,
        passwordConfirm: password,
        gravatar: `https://source.boringavatars.com/beam/120/${username}`,
      })
      .then(() => {
        login();
      })
      .catch((err: any) => {
        toast.error(err.message);
      });
  }
  async function login() {
    await pb
      .collection("users")
      .authWithPassword(email, password)
      .then((res: any) => {
        console.log(res.record.gravatar);
        setUser(res);
        toast(`Welcome ${res.record.username}!`);
      });

    setShowAuthModal(false);
  }

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
    <>
      <nav className="w-20 h-full fixed bg-dark-primary dark:bg-text-secondary flex flex-col text-light-secondary border-r-2 border-light-secondary dark:border-dark-secondary">
        {/* <h1 className=" text-3xl font-bold mx-auto text-center"></h1> */}
        <section className="flex w-full h-full flex-col ">
          {routes.map((route) => (
            <Link
              className="w-full h-20 flex hover:bg-light-secondary hover:dark:bg-dark-secondary transition-all hover:dark:text-light-primary justify-center text-4xl items-center  hover:text-orange-500 text-dark-secondary dark:text-dark-secondary"
              href={route.route}
              key={route.title}
            >
              {route.icon}
            </Link>
          ))}
        </section>
        <section>
          <button
            className={`w-12 h-12 relative rounded-full flex bg-gradient-to-r from-cyan-500 to-blue-500 mx-4 mb-3 `}
            onClick={() => {
              if (!user) {
                setShowAuthModal((showAuthModal: any) => !showAuthModal);
              } else {
                toast.success("Logging out...");
                setUser(undefined);
              }
            }}
          >
            {user?.record?.gravatar && (
              <img
                className="w-full h-full z-50 object-cover"
                alt="user generated avatar"
                src={user?.record?.gravatar}
              />
            )}
          </button>
        </section>
        <section>
          <button
            className="w-12 h-12 rounded-full bg-gradient-to-r flex text-light-primary dark:text-dark-secondary  justify-center items-center text-4xl from-cyan-500 to-blue-500 dark:from-transparent dark:to-transparent mx-4 mb-3 "
            onClick={() => toggleTheme()}
          >
            {theme === "light" ? <GiSun /> : <GiMoon />}
          </button>
        </section>
      </nav>
      {showAuthModal && (
        <div
          className="w-screen flex justify-center items-center h-screen absolute inset-0 bg-[#00000060]"
          typeof="button"
          data-value="parent"
          onClick={(event: any) => {
            event.preventDefault();
            let dataValue = (event.target as HTMLElement).getAttribute(
              "data-value"
            );
            if (dataValue === "parent") {
              setShowAuthModal((showAuthModal) => !showAuthModal);
            }
          }}
        >
          <div
            data-value="child"
            className="w-1/3 h-5/6 min-w-[500px] flex flex-col bg-light-primary text-light-secondary border-2 border-light-secondary dark:bg-dark-primary dark:border-dark-secondary dark:text-dark-secondary rounded-md overflow-hidden"
          >
            {toggleSignUp ? (
              <>
                <img
                  src="/assets/tasha-1280x720.png"
                  alt="me"
                  className="w-full h-36 object-cover"
                />
                <div className="flex flex-col pt-10 gap-8 items-center h-full w-full">
                  <button
                    onClick={() =>
                      setToggleSignUp((toggleSignUp) => !toggleSignUp)
                    }
                  >
                    To Login
                  </button>
                  <section className="flex gap-4 items-center">
                    <label className="w-20 font-medium " htmlFor="email">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      className="w-80"
                      onChange={(e: any) => setEmail(e.target.value)}
                      placeholder="dungeondork@gmail.com"
                    />
                  </section>

                  <section className="flex gap-4 items-center">
                    <label className="w-20 font-medium " htmlFor="password">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      className="w-80"
                      onChange={(e: any) => setPassword(e.target.value)}
                      placeholder="********"
                    />
                  </section>
                  <section className="flex gap-4 items-center">
                    <label className="w-20 font-medium " htmlFor="username">
                      Username
                    </label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      className="w-80"
                      onChange={(e: any) => setUsername(e.target.value)}
                      placeholder="Zanzibar"
                    />
                  </section>
                  <Button
                    className="mt-auto w-10/12 mb-5"
                    onClick={() => signup()}
                  >
                    Sign up
                  </Button>
                </div>
              </>
            ) : (
              <>
                <img
                  src="/assets/dnd-exploration-2-1222955.webp"
                  alt="me"
                  className="w-full h-36 object-cover"
                />
                <div className="flex flex-col pt-10 gap-8 items-center h-full w-full">
                  <button
                    onClick={() =>
                      setToggleSignUp((toggleSignUp) => !toggleSignUp)
                    }
                  >
                    To Signup
                  </button>
                  <section className="flex gap-4 items-center">
                    <label className="w-20 font-medium " htmlFor="email">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      className="w-80"
                      onChange={(e: any) => setEmail(e.target.value)}
                      placeholder="dungeondork@gmail.com"
                    />
                  </section>
                  <section className="flex gap-4 items-center">
                    <label className="w-20 font-medium " htmlFor="password">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      className="w-80"
                      onChange={(e: any) => setPassword(e.target.value)}
                      placeholder="********"
                    />
                  </section>
                  <Button
                    className="mt-auto w-10/12 mb-5"
                    onClick={() => login()}
                  >
                    Log in
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
