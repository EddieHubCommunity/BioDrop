export default function UserEddieHubDataItem({ label, amount }) {
  return (
    <div className="pt-6">
      <div className="text-primary-high dark:text-primary-low-medium group">
        <div className="flow-root rounded-lg bg-primary-low dark:bg-primary-medium px-6 pb-8">
          <div className="-mt-6">
            <div className="flex justify-center">
              <span className="inline-flex items-center justify-center rounded-xl bg-secondary-high p-3 shadow-lg">
                <figure className="h-8 w-full text-center inline-flex items-center text-white">
                  {amount}
                </figure>
              </span>
            </div>
            <h3 className="mt-8 text-lg text-center font-semibold leading-8 tracking-tight dark:text-white">
              {label}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
