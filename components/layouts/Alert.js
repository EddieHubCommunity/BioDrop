import { FaGithub } from "react-icons/fa6";

export default function Alert() {
  return (
    <div className="flex items-center gap-x-6 bg-gray-900 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <p className="text-sm leading-6 text-white whitespace-nowrap">
        <a
          href="https://github.com/EddieHubCommunity/BioDrop"
          target="_blank"
          className="hover:text-primary-low text-tertiary-medium flex items-center gap-x-1"
        >
          Support by Starring our
          <FaGithub aria-label="GitHub" />
          GitHub Repo!
          <span aria-hidden="true">&rarr;</span>
        </a>
      </p>
      <div className="flex flex-1 justify-end"></div>
    </div>
  );
}
