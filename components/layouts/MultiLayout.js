import Navbar from "../navbar/Navbar";
import Footer from "../Footer";

export default function MultiLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
