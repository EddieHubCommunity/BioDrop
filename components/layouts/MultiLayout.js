import Navbar from "@components/navbar/Navbar";
import Footer from "@components/Footer";
import SkipLink from "@components/SkipLink";
import Alert from "./Alert";

export default function MultiLayout({ settings, children }) {
  return (
    <>
      <SkipLink />
      <div className="flex flex-col min-h-screen">
        {(!settings ||
          settings.type === "free" ||
          (settings.type === "premium" && !settings.hideNavbar)) && (
          <>
            <Alert />
            <Navbar />
          </>
        )}
        <main id="main" className="flex-1 dark:bg-dark-2 dark:z-10">
          {children}
        </main>
        {(!settings ||
          settings.type === "free" ||
          (settings.type === "premium" && !settings.hideFooter)) && <Footer />}
      </div>
    </>
  );
}
