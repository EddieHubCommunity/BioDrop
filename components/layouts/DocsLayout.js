export default function DocsLayout({ children }) {
  const pages = [
    {
      name: "Docs home",
      path: "/docs",
    },
    {
      name: "Getting Started",
      path: "/docs/getting-started",
    },
    {
      name: "Basic Profile",
      path: "/docs",
    },
    {
      name: "Advanced Profile",
      path: "/docs/profile",
    },
    {
      name: "Automated tests",
      path: "/docs/automated-tests",
    },
    {
      name: "Available Icons",
      path: "/docs/icons",
    },
    {
      name: "FAQs",
      path: "/docs/faqs",
    },
  ];
  return (
    <>
      <div className="bg-gray-50 mb-8 drop-shadow-md">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
          <h1 className="text-3xl font-bold">Documentation</h1>
          <h2 className="text-2xl">
            LinkFree is the Open Source alternative to LinkTree.
          </h2>
          <p>
            These docs are written in Markdown in the <code>docs</code>{" "}
            directory, improvements welcome.
          </p>
          <span className="isolate flex flex-col md:flex-row rounded-md shadow-sm">
            {pages.map((page) => (
              <a
                key={page.name}
                type="button"
                href={page.path}
                className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {page.name}
              </a>
            ))}
          </span>
        </div>
      </div>

      <div className="float-none mx-auto my-0 w-[90%] max-w-[1440px] prose">
        {children}
      </div>
    </>
  );
}
