import { useState } from "react";
import { onlyText } from "react-children-utilities";
import ClipboardDocumentIcon from "@heroicons/react/24/outline/ClipboardDocumentIcon";
import ClipboardDocumentCheckIcon from "@heroicons/react/24/outline/ClipboardDocumentCheckIcon";

const ClipboardCopyButton = ({ link }) => {
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
      await copyTextToClipboard(onlyText(link));
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 top-0 right-0 z-10 rounded-md transition ease-in-out duration-300">
        <button
          type="button"
          aria-label="Copy to Clipboard"
          onClick={handleCopyClick}
          className="transition rounded-md flex items-center justify-center text-center px-2 focus:outline-none fade-in group-hover:flex"
        >
          {isCopied ? (
            <div className="inline-flex items-center text-green-500">
              <ClipboardDocumentCheckIcon className="h-4 w-4 mr-2 text-green-500" />
              <span className="text-green-500 text-sm font-semibold leading-6 text-gray-900 sm:block">
                Copied!
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center transition-all ease-out">
              <ClipboardDocumentIcon className="h-4 w-4 mr-2" />
              <span className="text-sm font-semibold leading-6 text-gray-900">
                Copy
              </span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ClipboardCopyButton;
