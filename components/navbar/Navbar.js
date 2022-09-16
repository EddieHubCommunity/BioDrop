import { useRouter } from "next/router";
import NavLink from "./NavLink";
import Image from "next/image";
import { Hamburger } from "./Hamburger";
import { useState } from "react";
import { appRoutes } from "./data";
import { MobileMenu } from "./MobileMenu";
import { Version } from "./Version";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
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
            <ul className="items-baseline hidden ml-10 space-x-4 md:flex">
              {appRoutes.map((item) => (
                <li key={item.name}>
                  <NavLink path={router.asPath} item={item} />
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block">
            <Version />
          </div>
          <div className="flex -mr-2 md:hidden">
            <Hamburger onClick={() => setOpen((prev) => !prev)} />
          </div>
        </div>
      </div>
      {open && <MobileMenu />}
    </nav>
  );
}
