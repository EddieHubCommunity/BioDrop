import Navbar from "../navbar/Navbar";

export default function MultiLayout({ children }) {
  return (
    <>
      <Navbar></Navbar>
      <main>{children}</main>
      <footer className="flex justify-center mt-8 italic">
        Powered by EddieHub
      </footer>
    </>
  );
}
