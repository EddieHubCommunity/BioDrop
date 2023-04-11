import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/legacy/image";

import app from "@config/app.json";
import NavLink from "@components/navbar/NavLink";
import Link from "@components/Link";
import getIcon from "@components/Icon";
import { useTheme } from "next-themes";

const FaGithub = getIcon("FaGithub");
const FaRegMoon = getIcon("FaRegMoon");
const FaSun = getIcon("FaSun");

export default function Navbar() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const getLink = (path) => `${router.basePath}${path}`;
  const navConRef = useRef();

  const renderThemeChanger = () => {
    if (!mounted) {
      return null;
    }

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <button className="p-2 text-white" onClick={() => setTheme("light")}>
          <FaSun className="text-gray-400 hover:text-white"/>
        </button>
      )
    }

    return (
      <button
        className="p-2 text-white"
        onClick={() => setTheme("dark")}
        aria-label="Toggle Theme"
      >
        <FaRegMoon className="text-gray-400 hover:text-white" />
      </button>
    );
  };

  useEffect(() => {
    const detectClickOutsideHandler = (e) => {
      if (
        isOpen &&
        navConRef.current &&
        !navConRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    isOpen && document.addEventListener("click", detectClickOutsideHandler);

    return () => {
      document.removeEventListener("click", detectClickOutsideHandler);
    };
  }, [isOpen]);

  const primary = [
    {
      name: "Search",
      url: "/search",
    },
    {
      name: "Events",
      url: "/events",
    },
    {
      name: "Map",
      url: "/map",
    },
    {
      name: "Docs",
      url: "/docs",
    },
    {
      name: "Playground",
      url: "/playground",
    },
  ];

  const authControls = () => (
    <>
      {!session && (
        <NavLink
          item={{ name: "Login", url: "/login" }}
          setIsOpen={setIsOpen}
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        />
      )}

      {session && (
        <>
          <NavLink
            item={{ name: "Account", url: "/account/statistics" }}
            setIsOpen={setIsOpen}
          />
          <NavLink
            item={{ name: "Logout", url: "/" }}
            setIsOpen={setIsOpen}
            onClick={() => signOut()}
          />
        </>
      )}
    </>
  );

  return (
    <div className="min-h-full" ref={navConRef}>
      <nav className="relative top-0 bg-primary-high dark:bg-primary-medium">
        <div className="z-30 w-full mx-auto px-4 sm:px-6 lg:px-8 relative t-0">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <Image
                    src={getLink("/logo192.png")}
                    alt="EddieHub logo"
                    width={32}
                    height={32}
                    priority
                    onClick={() => setIsOpen(false)}
                  />
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {primary.map((item) => (
                    <NavLink
                      key={item.name}
                      path={router.pathname}
                      item={item}
                      setIsOpen={setIsOpen}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-3">
                {renderThemeChanger()}
                <NavLink
                  item={{ name: `v${app.version}`, url: "/changelog" }}
                  setIsOpen={setIsOpen}
                />
                <div className="relative">
                  <a
                    href="https://github.com/EddieHubCommunity/LinkFree"
                    aria-current="page"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white"
                  >
                    <FaGithub className="text-gray-400 hover:text-white" aria-label="GitHub" />
                  </a>
                </div>
                {authControls()}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(isOpen ? false : true)}
                type="button"
                className="bg-primary-high inline-flex items-center justify-center p-2 rounded-md text-primary-low-medium hover:text-white hover:bg-primary-medium focus:outline-offset-2"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${
            isOpen
              ? "transform translate-y-0 opacity-100"
              : "transform -translate-y-96 opacity-0 "
          } md:hidden z-20 absolute t-0 bg-primary-medium transition-all duration-700 ease-in-out w-full`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {primary.map((item, index) => (
              <NavLink
                key={index}
                path={router.pathname}
                item={item}
                mode="mobile"
                setIsOpen={setIsOpen}
              />
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-primary-medium">
            <div className="flex items-center px-5">
              <div className="flex items-center md:ml-6">
                {renderThemeChanger()}
                <NavLink
                  item={{ name: `v${app.version}`, url: "/changelog" }}
                  setIsOpen={setIsOpen}
                />
                <div className="ml-3 mr-2 relative">
                  <Link
                    href="https://github.com/EddieHubCommunity/LinkFree"
                    aria-current="page"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white"
                  >
                    <FaGithub className="text-gray-400 hover:text-white" aria-label="GitHub" />
                  </Link>
                </div>
                {authControls()}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
