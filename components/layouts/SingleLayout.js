import Footer from "@components/Footer";
import { SkipLink } from "@components/SkipLink";

export default function SingleLayout({ children }) {
  return (
    <>
      <SkipLink />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
