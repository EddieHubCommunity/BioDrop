import Navbar from "../navbar/Navbar";
import Footer from "../Footer";

export default function MultiLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
