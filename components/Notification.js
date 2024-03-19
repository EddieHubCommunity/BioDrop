import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import XMarkIcon from "@heroicons/react/20/solid/XMarkIcon";
import ExclamationCircleIcon from "@heroicons/react/20/solid/ExclamationCircleIcon";
import { useEffect } from "react";

export default function Notification({
  show,
  onClose,
  type,
  message,
  additionalMessage,
  duration = 2000,
}) {
  let iconComponent;
  switch (type) {
    case "success":
      iconComponent = (
        <CheckCircleIcon
          className="h-6 w-6 text-green-400"
          aria-hidden="true"
        />
      );
      break;
    case "error":
      iconComponent = (
        <ExclamationCircleIcon
          className="h-6 w-6 text-red-400"
          aria-hidden="true"
        />
      );
      break;
    default:
      iconComponent = null;
      break;
  }

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [show, onClose, duration]);

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed z-40 inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">{iconComponent}</div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-primary-high">
                    {message}
                  </p>
                  {additionalMessage && (
                    <p className="mt-1 text-sm text-primary-medium">
                      {additionalMessage}
                    </p>
                  )}
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-white text-primary-medium-low hover:text-primary-medium focus:outline-none focus:ring-2 focus:ring-secondary-low focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
