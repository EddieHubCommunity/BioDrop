import { useEffect } from "react";
import ChevronDoubleLeftIcon from "@heroicons/react/24/outline/ChevronDoubleLeftIcon";
import ChevronDoubleRightIcon from "@heroicons/react/24/outline/ChevronDoubleRightIcon";
import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";
import ChevronLeftIcon from "@heroicons/react/24/outline/ChevronLeftIcon";
import { classNames } from "@services/utils/classNames";

const Pagination = ({
  data,
  currentPage,
  paginate,
  perPage,
  startIndex,
  endIndex,
}) => {
  const totalResults = data.length;
  const totalPages = Math.ceil(totalResults / perPage);

  useEffect(() => {
    // Add keydown event listener to handle pagination
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && currentPage > 1) {
        paginate(currentPage - 1);
      }
      if (e.key === "ArrowRight" && currentPage < totalPages) {
        paginate(currentPage + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, totalPages, paginate]);

  let beforePage = currentPage - 3;
  let afterPage = currentPage + 3;
  const pageNumber = [];

  for (let plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      continue;
    }
    if (plength === 0) {
      plength = plength + 1;
    }
    pageNumber.push(plength);
  }

  return (
    <div>
      <ul
        role="list"
        className="list-none flex items-center w-full justify-center gap-2 sm:gap-4 mt-5 text-center font-semibold"
      >
        {currentPage > 4 && (
          <li>
            <button
              className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer border-2 rounded-full p-1 flex items-center justify-center hover:border-tertiary-medium hover:rounded-full transition-all"
              onClick={() => paginate(1)}
            >
              <ChevronDoubleLeftIcon
                className="w-6 h-6"
                title="Jump to first page"
              />
            </button>
          </li>
        )}
        {currentPage > 1 && (
          <li>
            <button
              className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer border-2 rounded-full p-1 flex items-center justify-center hover:border-tertiary-medium hover:rounded-full transition-all"
              onClick={() => paginate(currentPage - 1)}
            >
              <ChevronLeftIcon className="w-6 h-6" title="Previous page" />
            </button>
          </li>
        )}

        {pageNumber
          .filter((item) => item > 0)
          .map((pNumber) => (
            <li key={pNumber}>
              <button
                className={classNames(
                  currentPage === pNumber &&
                    "text-white bg-tertiary-medium border-tertiary-medium rounded-full",
                  "w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-base cursor-pointer border-2 rounded-full p-1 flex items-center justify-center hover:border-tertiary-medium transition-all",
                )}
                onClick={() => paginate(pNumber)}
              >
                {pNumber}
              </button>
            </li>
          ))}

        {currentPage < totalPages && (
          <li>
            <button
              className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer border-2 rounded-full p-1 flex items-center justify-center hover:border-tertiary-medium hover:rounded-full transition-all"
              onClick={() => paginate(currentPage + 1)}
            >
              <ChevronRightIcon className="w-6 h-6" title="Next page" />
            </button>
          </li>
        )}
        {currentPage < totalPages - 3 && (
          <li>
            <button
              className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer border-2 rounded-full p-1 flex items-center justify-center hover:border-tertiary-medium hover:rounded-full transition-all"
              onClick={() => paginate(totalPages)}
            >
              <ChevronDoubleRightIcon
                className="w-6 h-6"
                title="Jump to last page"
              />
            </button>
          </li>
        )}
      </ul>
      <p className="text-gray-500 text-center mt-3">{`${startIndex + 1}-${
        currentPage === totalPages ? totalResults : endIndex
      } of ${totalResults} results`}</p>
    </div>
  );
};
export default Pagination;
