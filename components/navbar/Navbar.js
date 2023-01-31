import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import NavLink from "./NavLink";
import Link from "../Link";
import app from "../../config/app.json";
import Image from "next/legacy/image";
import { FaGithub } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const getLink = (path) => `${router.basePath}${path}`;
  const navConRef = useRef();

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
      name: "Home",
      url: "/",
    },
    {
      name: "Discover",
      url: "/discover",
    },
    {
      name: "Search",
      url: "/search",
    },
    {
      name: "Community Events",
      url: "/events",
    },
    {
      name: "Docs",
      url: "/docs",
    },
  ];

  return (
    <div className="min-h-full" ref={navConRef}>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <Image
                    src={getLink("/logo192.png")}
                    alt="EddieHub logo"
                    width={32}
                    height={32}
                    onClick={() => setIsOpen(false)}
                  />
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {primary.map((item) => (
                    <NavLink key={item.name} path={router.asPath} item={item} />
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <span className="text-gray-400">v{app.version}</span>
                <div className="ml-3 relative">
                  <a
                    href="https://github.com/EddieHubCommunity/LinkFree"
                    aria-current="page"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconContext.Provider
                      value={{
                        color: "white",
                        style: { verticalAlign: "middle" },
                      }}
                    >
                      <FaGithub aria-label="GitHub" />
                    </IconContext.Provider>
                  </a>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(isOpen ? false : true)}
                type="button"
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
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

        <div className={`${!isOpen && "hidden"} md:hidden`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {primary.map((item, index) => (
              <NavLink
                key={index}
                path={router.asPath}
                item={item}
                mode="mobile"
                setIsOpen={setIsOpen}
              />
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex items-center md:ml-6">
                <span className="text-gray-400">v{app.version}</span>
                <div className="ml-3 relative">
                  <Link
                    href="https://github.com/EddieHubCommunity/LinkFree"
                    aria-current="page"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconContext.Provider
                      value={{
                        color: "white",
                        style: { verticalAlign: "middle" },
                      }}
                    >
                      <FaGithub />
                    </IconContext.Provider>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
