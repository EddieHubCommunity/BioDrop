import { useRouter } from "next/router";
import NavLink from "./NavLink";
import app from "../../config/app.json";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Navbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const primary = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Popular",
      url: "/popular",
    },
    {
      name: "Search",
      url: "/search",
    },
  ];

  return (
    <div className="min-h-full">
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image
                  src="/logo192.png"
                  alt="EddieHub logo"
                  width={32}
                  height={32}
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {primary.map((item) => (
                    <NavLink key={item.name} path={router.asPath} item={item} />
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:flex flex-row">
              <div className="ml-4 flex items-center md:ml-6">
                <span className="text-gray-400">v{app.version}</span>
                <div className="ml-3 relative">
                  <a
                    href="https://github.com/EddieHubCommunity/LinkFree"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                  >
                    GitHub
                  </a>
                </div>
                <div className="ml-3 relative">
                  <button
                    onClick={() =>
                      setTheme(() => (theme === "light" ? "dark" : "light"))
                    }
                    className="text-gray-300 bg-gray-700 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    aria-current="page"
                  >
                    {theme === "light" ? "☀️" : "🌙"}
                  </button>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
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
                  className="hidden h-6 w-6"
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

        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {primary.map((item, index) => (
              <NavLink
                key={index}
                path={router.asPath}
                item={item}
                mode="mobile"
              />
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center justify-between px-5">
              <div className="flex flex-row items-center">
                <div className="text-base font-medium leading-none text-white">
                  GitHub
                </div>
                <div className="text-sm font-medium leading-none text-gray-400 ml-2">
                  v{app.version}
                </div>
              </div>
              <div>
                <button
                  onClick={() =>
                    setTheme(() => (theme === "light" ? "dark" : "light"))
                  }
                  className="text-gray-300 bg-gray-700 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  {theme === "light" ? "☀️" : "🌙"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
