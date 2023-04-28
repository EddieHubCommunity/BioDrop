import Footer from "@components/Footer";
import { Fragment } from "react";

export default function SingleLayout({ children }) {
  return (
    <Fragment>
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}
