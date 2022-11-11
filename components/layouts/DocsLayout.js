export default function DocsLayout({ children }) {
  return (
    <div className="float-none mx-auto my-0 w-[90%] max-w-[1440px]">
      <div className="prose max-w-none w-full mt-8">{children}</div>
    </div>
  );
}
