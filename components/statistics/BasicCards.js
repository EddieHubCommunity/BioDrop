// Importing the abbreviateNumber function from the utils directory
import { abbreviateNumber } from "../../services/utils/abbreviateNumbers";
// Importing the MdArrowUpward icon from the react-icons library
import { MdArrowUpward } from "react-icons/md";

// Exporting the BasicCards component
export default function BasicCards({ data }) {
  // This component returns a definition list (dl) with the class "mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3"
  return (
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      // Mapping over the passed in data prop and returning a div for each item
      {data.map(
        (item) =>
          // Only returning a div for items with a total value greater than 0
          item.total > 0 && (
            <div
              // Adding classes to the div for styling purposes
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
              // Adding a key prop to the div for improved performance when rendering a list of items
              key={item.name}
            >
              {/* Adding a definition title (dt) to the div with the name of the item */}
              <dt className="truncate text-sm font-medium text-gray-500">
                {item.name}
              </dt>
              <dd className="mt-1 flex items-baseline justify-between sm:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                  {/* Using the abbreviateNumber function to format the current value of the item */}
                  {abbreviateNumber(item.current)}
                  <span className="ml-2 text-sm font-medium text-gray-500">
                    <span title={item.total}>
                      from {abbreviateNumber(item.total)}
                    </span>
                  </span>
                </div>
                <div className="bg-green-100 text-green-800 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
                  {/* Adding the MdArrowUpward icon to the div */}
                  <MdArrowUpward
                    className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                    aria-hidden="true"
                  />

                  {/* Checking if there is a delta value, and if so, returning a span indicating an increase */}
                  {item.delta && (
                    <>
                      <span className="sr-only">Increased by </span>
                      {abbreviateNumber(item.delta)}
                    </>
                  )}
                </div>
              </dd>
            </div>
          )
      )}
    </dl>
  );
}
