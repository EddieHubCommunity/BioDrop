import ReactMarkdown from "react-markdown";
import Link from "@components/Link";
import { classNames } from "@services/utils/classNames";

export default function Markdown({ className, children, ...restProps }) {
  const LinkRenderer = ({ href, children }) => (
    <Link href={href}>{children}</Link>
  );

  return (
    <ReactMarkdown
      components={{ a: LinkRenderer }}
      className={classNames("whitespace-pre-wrap", className)}
      {...restProps}
    >
      {children}
    </ReactMarkdown>
  );
}
