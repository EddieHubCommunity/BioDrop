import Link from "next/link";
import { GiMoneyStack } from "react-icons/gi";
import { ImPowerCord } from "react-icons/im";

export default function Footer() {
  return (
    <footer className="max-w-7xl py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between">
      <Link
        href="https://github.com/EddieHubCommunity/LinkFree"
        className="text-gray-400 hover:text-gray-500 flex justify-center space-x-6 md:order-2 gap-2"
      >
        <ImPowerCord className="h-6 w-6" aria-hidden="true" />
        Powered by EddieHub
      </Link>
      <Link
        href="https://github.com/EddieHubCommunity/LinkFree"
        className="text-gray-400 hover:text-gray-500 flex justify-center space-x-6 md:order-2 gap-2"
      >
        <GiMoneyStack className="h-6 w-6" aria-hidden="true" />
        Donate with GitHub Sponsors
      </Link>
    </footer>
  );
}
