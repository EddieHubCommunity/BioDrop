import React, { useState } from "react";
import { onlyText } from "react-children-utilities";

const ClipboardCopy = ({ children }) => {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = async () => {
    try {
      await copyTextToClipboard(onlyText(children));
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch (error) {
      console.log(err);
    }
  };

  return (
    <div className="relative">
      <div className="absolute flex items-center space-x-2 top-0 right-0 m-2">
        <button
          type="button"
          aria-label="Copy to Clipboard"
          onClick={handleCopyClick}
          className="transition rounded-md flex items-center justify-center text-center px-2 focus:outline-none fade-in group-hover:flex"
        >
          {isCopied ? (
            <span className="text-green-500 text-sm">Copied!</span>
          ) : (
            <span className="text-gray-500 text-sm">Copy</span>
          )}
        </button>
      </div>
      {children}
    </div>
  );
};

export default ClipboardCopy;
