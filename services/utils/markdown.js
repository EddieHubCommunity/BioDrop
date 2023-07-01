import Link from "@components/Link";

export const LinkRenderer = ({ href, children }) => (
  <Link href={href}>{children}</Link>
);
