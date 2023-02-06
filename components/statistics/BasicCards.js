import { abbreviateNumber } from "../../services/utils/abbreviateNumbers";
import { MdArrowUpward } from "react-icons/md";

export default function BasicCards({ data }) {
  return (
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      {data.map(
        (item) =>
          item.total > 0 && (
            <div
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
              key={item.name}
            >
              <dt className="truncate text-sm font-medium text-gray-500">
                {item.name}
              </dt>
              <dd className="mt-1 flex items-baseline justify-between sm:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                  {abbreviateNumber(item.current)}
                  <span className="ml-2 text-sm font-medium text-gray-500">
                    <span title={item.total}>
                      from {abbreviateNumber(item.total)}
                    </span>
                  </span>
                </div>
                <div className="bg-green-100 text-green-800 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
                  <MdArrowUpward
                    className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                    aria-hidden="true"
                  />

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
