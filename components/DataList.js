export default function DataList({ title, subtitle, data }) {
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-primary-high dark:text-primary-low">
          {title}
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-primary-high dark:text-primary-low">
          {subtitle}
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {data.map((row) => (
            <div
              className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
              key={row.name}
            >
              <dt className="text-sm font-medium leading-6 text-primary-high dark:text-primary-low">
                {row.name}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-primary-high dark:text-primary-low sm:col-span-2 sm:mt-0">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
