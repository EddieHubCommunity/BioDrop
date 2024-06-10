import SkipLink from "@components/SkipLink";
import Alert from "./Alert";

export default function MultiLayout({ settings, children }) {
  return (
    <>
      <SkipLink />
      <div className="flex flex-col min-h-screen">
        {(!settings || !settings.hideNavbar) && (
          <>
            <Alert />
          </>
        )}
        <main id="main" className="flex-1 dark:bg-dark-2 dark:z-40">
          {children}
        </main>
      </div>
    </>
  );
}
