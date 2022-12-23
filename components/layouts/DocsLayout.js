export default function DocsLayout({ children }) {
  return (
    <>
      <div className="float-none mx-auto my-0 w-[90%] max-w-[1440px] prose">
        <div className="flex flex-grow flex-row">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
