import { useState } from "react";
import { onlyText } from "react-children-utilities";
import ClipboardDocumentIcon from "@heroicons/react/24/outline/ClipboardDocumentIcon";
import ClipboardDocumentCheckIcon from "@heroicons/react/24/outline/ClipboardDocumentCheckIcon";

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
      console.error(error);
    }
  };

  return (
    <div className="relative w-full">
      <button
        className="bg-primary-medium-low absolute flex items-center space-x-2 top-0 right-0 p-2 m-2 z-10 rounded-md transition hover:bg-primary-high ease-in-out duration-300"
        type="button"
        aria-label="Copy to Clipboard"
        onClick={handleCopyClick}
      >
        <div className="transition rounded-md flex items-center justify-center text-center px-2 focus:outline-none fade-in group-hover:flex">
          {isCopied ? (
            <div className="inline-flex items-center text-green-500">
              <ClipboardDocumentCheckIcon className="h-4 w-4 mr-2 text-green-500" />
              <span className="text-green-500 text-sm">Copied!</span>
            </div>
          ) : (
            <div className="inline-flex items-center transition-all ease-out">
              <ClipboardDocumentIcon className="h-4 w-4 mr-2 text-primary-low" />
              <span className="text-primary-low text-sm">Copy</span>
            </div>
          )}
        </div>
      </button>
      {children}
    </div>
  );
};

export default ClipboardCopy;
