import Table from "./Table";
export const ComponentStyle = {
  table: Table,
  li: (props) => <li className="w-full break-all" {...props}></li>,
};

import Li  from "@components/mdx/Li";
import Link from "@components/Link";
import Strong from "@components/mdx/Strong";
import BlockQuote from "@components/mdx/BlockQuote";

export const ComponentStyle = {
  table: (props) => (
    <div className="w-full overflow-auto">
      <table {...props}></table>
    </div>
  ),
  li: Li,
  a: Link,
  strong: Strong,
  blockquote: BlockQuote,
};

