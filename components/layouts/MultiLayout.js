import Navbar from "@components/navbar/Navbar";
import Footer from "@components/Footer";
import SkipLink from "@components/SkipLink";

export default function MultiLayout({ settings, children }) {
  return (
    <>
      <SkipLink />
      <div className="flex flex-col min-h-screen">
        {(!settings ||
          settings.type === "free" ||
          (settings.type === "premium" && !settings.hideNavbar)) && <Navbar />}
        <main id="main" className="flex-1 dark:bg-dark">
          {children}
        </main>
        {(!settings ||
          settings.type === "free" ||
          (settings.type === "premium" && !settings.hideFooter)) && <Footer />}
      </div>
    </>
  );
}
