import Navbar from "@components/navbar/Navbar";
import Footer from "@components/Footer";

export default function MultiLayout({ data, children }) {
  const hideNavbar = data?.hideNavbar || false;
  const hideFooter = data?.hideFooter || false;

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbar && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
