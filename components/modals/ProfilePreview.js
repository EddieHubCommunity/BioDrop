import UserPage from "@components/user/UserPage";

export default function Preview({ toggle, data }) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <div
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-gray-200/50"
    >
      <div class="relative w-full h-full max-w-5xl md:h-auto mx-auto shadow-2xl">
        {/* <!-- Modal content --> */}
        <div class="relative bg-white text-gray-900 rounded-lg">
          {/* <!-- Modal header --> */}
          <div class="flex items-start justify-between p-4  rounded-t border-gray-600">
            <button
              type="button"
              class="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
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
