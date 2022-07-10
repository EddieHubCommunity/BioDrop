export default function SingleLayout({ children }) {
  return (
    <>
      <p>Single layout</p>
      <main>{children}</main>
      <footer>Powered by EddieHub</footer>
    </>
  );
}
