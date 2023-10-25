import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import app from "@config/app.json";
import NavLink from "@components/navbar/NavLink";
import Link from "@components/Link";
import { useTheme } from "next-themes";
import { classNames } from "@services/utils/classNames";

import { FaGithub } from "react-icons/fa6";
import SunIcon from "@heroicons/react/20/solid/SunIcon";
import MoonIcon from "@heroicons/react/20/solid/MoonIcon";
import { BASE_GITHUB_PROJECT_URL } from "@constants/index";
import LogoWide from "@public/logos/LogoWide";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const navConRef = useRef();
  const { data: session } = useSession();
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) {
      return null;
    }

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <button
          className="p-2"
          onClick={() => setTheme("light")}
          aria-label="Toggle Theme"
        >
          <SunIcon className="h-5 w-5 text-primary-low hover:text-secondary-low" />
        </button>
      );
    }

    return (
      <button
        className="p-2"
        onClick={() => setTheme("dark")}
        aria-label="Toggle Theme"
      >
        <MoonIcon className="h-5 w-5 text-primary-low hover:text-secondary-low" />
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
      name: "Repos",
      url: "/repos",
    },
    {
      name: "Pricing",
      url: "/pricing",
    },
  ];

  const authControls = () => (
    <>
      {!session && (
        <>
          <NavLink
            item={{ name: "Login", url: "/login" }}
            setIsOpen={setIsOpen}
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          />
          <NavLink
            item={{ name: "Sign up", url: "/pricing" }}
            setIsOpen={setIsOpen}
          />
        </>
      )}

      {session && (
        <>
          <NavLink
            item={{ name: "Account", url: "/account/onboarding" }}
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
    <header className="min-h-full" ref={navConRef}>
      <nav
        className={classNames(
          "relative top-0 bg-primary-high dark:bg-primary-medium",
          session &&
            session.accountType === "premium" &&
            "border-b-2 border-tertiary-medium",
        )}
      >
        <div className="z-30 w-full mx-auto px-4 sm:px-6 lg:px-8 relative t-0">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" aria-label="BioDrop Home">
                  <LogoWide onClick={() => setIsOpen(false)} width={128} />
                </Link>
              </div>
              <div className="hidden md:block">
                <ul className="ml-10 flex items-baseline space-x-4">
                  {primary.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        path={router.pathname}
                        item={item}
                        setIsOpen={setIsOpen}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-3">
                {renderThemeChanger()}
                <Link
                  href={BASE_GITHUB_PROJECT_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-current="page"
                >
                  <div className="relative p-2">
                    <FaGithub
                      className="text-primary-low hover:text-secondary-low"
                      aria-label="GitHub"
                    />
                  </div>
                </Link>
                {authControls()}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(isOpen ? false : true)}
                type="button"
                className="bg-primary-high inline-flex items-center justify-center p-2 rounded-md text-primary-medium-low hover:text-white hover:bg-primary-medium focus:outline-offset-2"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={classNames(isOpen ? "hidden" : "block", "h-6 w-6")}
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
                  className={classNames(isOpen ? "block" : "hidden", "h-6 w-6")}
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
          className={classNames(
            isOpen
              ? "transform translate-y-0 opacity-100"
              : "transform -translate-y-96 opacity-0",
            "md:hidden z-20 absolute t-0 bg-primary-medium transition-all duration-700 ease-in-out w-full",
          )}
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
              <div className="flex items-center md:ml-6 flex-wrap justify-center sm:justify-start">
                {renderThemeChanger()}
                <NavLink
                  item={{ name: `v${app.version}`, url: "/changelog" }}
                  setIsOpen={setIsOpen}
                />
                <Link
                  href={BASE_GITHUB_PROJECT_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-current="page"
                >
                  <div className="ml-3 mr-2 relative p-2">
                    <FaGithub
                      className="text-primary-low hover:text-secondary-low"
                      aria-label="GitHub"
                    />
                  </div>
                </Link>

                {authControls()}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
