import Link from "next/link";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 md:flex md:justify-between">
      <Link
        href="https://github.com/EddieHubCommunity/LinkFree"
        className="text-gray-400 hover:text-gray-500 flex justify-center space-x-6 md:order-2 gap-2"
      >
        <FaPowerOff className="h-6 w-6" aria-hidden="true" />
        Powered by EddieHub
      </Link>
      <Link
        href="https://github.com/EddieHubCommunity/LinkFree"
        className="text-gray-400 hover:text-gray-500 flex justify-center space-x-6 md:order-2 gap-2"
      >
        <FaMoneyBillAlt className="h-6 w-6" aria-hidden="true" />
        Donate with GitHub Sponsors
      </Link>
    </footer>
  );
}
