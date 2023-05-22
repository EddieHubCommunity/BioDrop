import Navbar from "@components/navbar/Navbar";
import Footer from "@components/Footer";
import Alert from "@components/Alert";

export default function MultiLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Alert
        type="warning"
        message={`To (re)load json files and any changes, please click >>> `}
        url="/api/system/reload?secret=development"
        action="Load data"
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
