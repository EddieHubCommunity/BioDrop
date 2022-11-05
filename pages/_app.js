import "../styles/globals.css";
import MultiLayout from "../components/layouts/MultiLayout";

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout || ((page) => <MultiLayout>{page}</MultiLayout>);

  return getLayout(<Component {...pageProps} />);
}
