import { useEffect, useRef } from "react";

import UserPage from "@components/user/UserPage";

export default function Preview({ toggle, data }) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const modalContentRef = useRef(null);

  const handleClickOutsideContentBox = (e) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target)
    ) {
      toggle();
    }
  };

  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.key === "Escape") {
        toggle();
      }
    };

    document.addEventListener("keydown", handleEscapeKeyPress);

    return () => document.removeEventListener("keydown", handleEscapeKeyPress);
  }, []);

  return (
    <div
      onClick={handleClickOutsideContentBox}
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-primary-low/50"
    >
      <div class="relative w-full h-full max-w-5xl md:h-auto mx-auto shadow-2xl">
        {/* <!-- Modal content --> */}
        <div
          ref={modalContentRef}
          class="dark:bg-primary-high dark:text-white relative bg-white text-primary-high rounded-lg"
        >
          {/* <!-- Modal header --> */}
          <div class="flex items-start justify-between p-4  rounded-t border-primary-medium">
            <button
              type="button"
              class="text-primary-medium-low bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-primary-medium hover:text-white"
              data-modal-hide="defaultModal"
              onClick={toggle}
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div class="p-6 space-y-6">
            <UserPage data={data} BASE_URL={BASE_URL} />
          </div>
        </div>
      </div>
    </div>
  );
}
