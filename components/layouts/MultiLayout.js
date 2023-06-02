import Navbar from "@components/navbar/Navbar";
import Footer from "@components/Footer";
import SkipLink from "@components/SkipLink";

export default function MultiLayout({ children }) {
  return (
    <>
      <SkipLink />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
