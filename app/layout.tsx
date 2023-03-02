/* eslint-disable react/jsx-no-undef */
"use client";
import { Sidebar } from "./components/common/Sidebar";
import "./globals.css";
import React, { useEffect, useState } from "react";
import { Button } from "./components/common/Button";
import { Input } from "./components/common/Input";
import PocketBase from "pocketbase";
import { useSheetStore } from "./utils/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { applyThemePreference } from "./utils/themeUtils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [toggleSignUp, setToggleSignUp] = useState<boolean>(false);
  const setUser = useSheetStore((state) => state.setUser);
  const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);

  async function signup() {
    //use pocketbase and add user to db

    await pb.collection("users").create({
      email: email,
      username: username,
      password: password,
      passwordConfirm: password,
    });

    login();
  }
  async function login() {
    await pb
      .collection("users")
      .authWithPassword(email, password)
      .then((res: any) => {
        console.log(res.record);
        setUser(res);
        toast(`Welcome ${res.record.username}!`);
      });

    setShowAuthModal(false);
  }
  return (
    <html lang="en">
      <body className="h-screen w-screen bg-light-primary dark:bg-dark-primary dark:text-dark-secondary text-light-secondary flex">
        <ToastContainer />
        <Sidebar setShowAuthModal={setShowAuthModal} />
        <div className="w-full h-full pl-20 flex flex-col">{children}</div>
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
              className="w-1/3 h-4/6 min-w-[500px] flex flex-col bg-light-secondary rounded-md overflow-hidden"
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
                    <Button className="mt-auto mb-5" onClick={() => signup()}>
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
                    <Button className="mt-auto mb-5" onClick={() => login()}>
                      Log in
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
