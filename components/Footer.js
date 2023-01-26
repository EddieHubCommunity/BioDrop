import Link from "../components/Link";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaRocket } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="pt-12 pb-14 px-4 sm:px-6 md:flex md:justify-between">
      <Link
        href="https://github.com/EddieHubCommunity/LinkFree"
        className="text-gray-500 hover:text-gray-600 flex justify-center space-x-6 md:order-2 gap-2"
      >
        <FaRocket className="h-6 w-6" aria-hidden="true" />
        Powered by EddieHub
      </Link>
      <Link
        href="http://github.com/sponsors/eddiejaoude"
        className="text-gray-500 hover:text-gray-600 flex justify-center space-x-6 md:order-2 gap-2"
      >
        <FaMoneyBillAlt className="h-6 w-6" aria-hidden="true" />
        Donate to LinkFree
      </Link>
    </footer>
  );
}
