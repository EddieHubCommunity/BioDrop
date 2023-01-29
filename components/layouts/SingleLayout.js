import Footer from "../Footer";

export default function SingleLayout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
