export default function DocsLayout({ children }) {
  const pages = [
    {
      name: "Basic Profile",
      path: "/docs",
    },
    {
      name: "Advanced Profile",
      path: "/docs/profile",
    },
  ];
  return (
    <>
      <div className="bg-gray-50 mb-8 drop-shadow-md">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h1 className="text-3xl font-bold">Documentation</h1>
          <h2 className="text-2xl">
            LinkFree is the Open Source alternative to LinkTree.
          </h2>
          <p>
            These docs are written in Markdown in the <code>docs</code>{" "}
            directory, improvements welcome.
          </p>
          <div className="flex flex-row gap-4 mt-3">
            {pages.map((page) => (
              <div
                className="inline-flex rounded-md drop-shadow-md"
                key={page.path}
              >
                <a
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600"
                  href={page.path}
                >
                  {page.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="float-none mx-auto my-0 w-[90%] max-w-[1440px] prose">
        {children}
      </div>
    </>
  );
}
