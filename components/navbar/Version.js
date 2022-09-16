import React from "react";
import app from "../../config/app.json";

export const Version = () => {
  return (
    <div className="flex items-center justify-between px-6 md:px-0">
      <span className="text-gray-400">v{app.version}</span>
      <div className="relative ml-3">
        <a
          href="https://github.com/EddieHubCommunity/LinkFree"
          className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
          aria-current="page"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};
