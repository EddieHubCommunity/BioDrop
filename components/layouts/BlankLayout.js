export default function BlankLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main>{children}</main>
    </div>
  );
}
