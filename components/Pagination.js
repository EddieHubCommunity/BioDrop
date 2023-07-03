import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { BsChevronDoubleRight } from "react-icons/bs";
import { BsChevronDoubleLeft } from "react-icons/bs";

const Pagination = ({
  data,
  currentPage,
  paginate,
  perPage,
  startIndex,
  endIndex,
}) => {
  const [screenWidth, setScreenWidth] = useState();
  const totalResults = data.length;
  const totalPages = Math.ceil(totalResults / perPage);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

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

  let beforePage = currentPage - 1;
  let afterPage = currentPage + 1;
  const MEDIUM_SCREEN = 768;
  const LARGE_SCREEN = 1024;
  const pageNumber = [];

  // medium screen pagination layout
  if (screenWidth >= MEDIUM_SCREEN && screenWidth < LARGE_SCREEN) {
    beforePage = currentPage - 2;
    afterPage = currentPage + 2;
  }

  // large screen pagination layout
  if (screenWidth >= LARGE_SCREEN) {
    beforePage = currentPage - 3;
    afterPage = currentPage + 3;
  }

  if (currentPage === totalPages) {
    beforePage = beforePage - 2;
  }

  if (currentPage === 1) {
    afterPage = afterPage + 2;
  }

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
        className="list-none flex items-center w-full justify-center gap-4 mt-5 text-center font-semibold"
      >
        {currentPage > 4 && screenWidth >= LARGE_SCREEN && (
          <li>
            <button
              className="w-8 h-8 cursor-pointer border-2 rounded-full p-1 flex items-center justify-center hover:border-tertiary-medium hover:rounded-full transition-all"
              onClick={() => paginate(1)}
            >
              <BsChevronDoubleLeft title="Jump to first page" />
            </button>
          </li>
        )}
        {currentPage > 1 && (
          <li>
            <button
              className="w-8 h-8 cursor-pointer border-2 rounded-full p-1 flex items-center justify-center hover:border-tertiary-medium hover:rounded-full transition-all"
              onClick={() => paginate(currentPage - 1)}
            >
              <FaChevronLeft title="Previous page" />
            </button>
          </li>
        )}

        {pageNumber
          .filter((item) => item > 0)
          .map((pNumber) => (
            <li key={pNumber}>
              <button
                className={`w-8 h-8 cursor-pointer border-2 rounded-full p-1 flex items-center justify-center hover:border-tertiary-medium transition-all ${
                  currentPage === pNumber
                    ? "text-white bg-tertiary-medium border-tertiary-medium rounded-full"
                    : ""
                }`}
                onClick={() => paginate(pNumber)}
              >
                {pNumber}
              </button>
            </li>
          ))}

        {currentPage < totalPages && (
          <li>
            <button
              className="w-8 h-8 cursor-pointer border-2 rounded-full p-1 flex items-center justify-center hover:border-tertiary-medium hover:rounded-full transition-all"
              onClick={() => paginate(currentPage + 1)}
            >
              <FaChevronRight title="Next page" />
            </button>
          </li>
        )}
        {currentPage < totalPages - 3 && screenWidth >= LARGE_SCREEN && (
          <li>
            <button
              className="w-8 h-8 cursor-pointer border-2 rounded-full p-1 flex items-center justify-center hover:border-tertiary-medium hover:rounded-full transition-all"
              onClick={() => paginate(totalPages)}
            >
              <BsChevronDoubleRight title="Jump to last page" />
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
