export default function DocsLayout({ children }) {
  return (
    <>
      <div className="float-none mx-auto my-0 w-[90%] max-w-[1440px] prose">
        <div className="flex flex-grow flex-row">
          <main className="mx-4">{children}</main>
        </div>
      </div>
    </>
  );
}
