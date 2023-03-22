import Footer from "@components/Footer";

export default function SingleLayout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
