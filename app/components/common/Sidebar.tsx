/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
"use client";
import { useSheetStore } from "@/app/utils/store";
import { applyThemePreference } from "@/app/utils/themeUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";
import { useEffect, useRef, useState } from "react";
import {
  GiDiceEightFacesEight,
  GiFlamingSheet,
  GiMoon,
  GiSun,
} from "react-icons/gi";
import { toast } from "react-toastify";
import { Button } from "./Button";
import { Input } from "./Input";
import { Modal } from "./Modal";

export const Sidebar = () => {
  const theme = useSheetStore((state) => state.theme);
  const toggleTheme = useSheetStore((state) => state.toggleTheme);
  const user = useSheetStore((state) => state.user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showAccountModal, setShowAccountModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [toggleSignUp, setToggleSignUp] = useState<boolean>(false);
  const setUser = useSheetStore((state) => state.setUser);
  const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);

  async function signup() {
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

  useEffect(() => {
    console.log(showAccountModal);
  }, [showAccountModal]);

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
                setShowAccountModal((showAccountModal) => !showAccountModal);
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
            className="w-1/3 h-5/6 min-w-[500px] flex z-50 flex-col bg-light-primary text-light-secondary border-2 border-light-secondary dark:bg-dark-primary dark:border-dark-secondary dark:text-dark-secondary rounded-md overflow-hidden"
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
      <Modal showModal={showAccountModal} setShowModal={setShowAccountModal}>
        <div className="flex w-full h-full">
          <section className="flex flex-col w-full">
            <p>{user?.record?.username}</p>
            <p>{user?.record?.email}</p>
          </section>
          <section className="w-full h-full justify-end flex flex-col">
            <section className="bg-lime-500 w-full aspect-square flex rounded-full overflow-hidden relative">
              <img
                src={user?.record?.gravatar}
                alt="gravatar"
                onClick={() => fileInputRef.current?.click()}
                className=" flex w-full h-full z-0 object-cover cursor-pointer hover:opacity-75"
              />
              <label htmlFor="file">Lol</label>
              <input
                id="file"
                type="file"
                className="hidden absolute w-full h-full bg-light-secondary opacity-0 hover:opacity-60"
                placeholder="Upload an image"
                ref={fileInputRef}
                onChange={(e) => {
                  //set the user?.record?.gravatar to the file
                  if (e.target.files) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      const base64String = reader.result;
                      if (typeof base64String === "string") {
                        setUser((user: any) => ({
                          ...user,
                          record: {
                            ...user?.record,
                            gravatar: base64String,
                          },
                        }));
                      }
                    };
                  }
                }}
              />
            </section>
          </section>
        </div>
        <section className="flex mt-auto justify-end gap-x-4 w-full p-4">
          <Button onClick={() => toggleTheme()}>
            {theme === "light" ? <GiSun /> : <GiMoon />}
          </Button>
          <Button
            onClick={() => {
              toast("Logged out");
              setUser(undefined);
              setShowAccountModal(false);
              router.push("/");
            }}
          >
            Logout
          </Button>

          <Button
            className="bg-red-700 border-red-700"
            onClick={() => {
              toast("Logged out");
              setUser(undefined);
            }}
          >
            Remove Account
          </Button>
        </section>
      </Modal>
    </>
  );
};
