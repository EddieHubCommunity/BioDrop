import Link from "./Link";

export default function Button({ text, href, primary = false }) {
  let className = primary
    ? "text-white bg-indigo-600  hover:bg-indigo-700"
    : "text-indigo-600 hover:bg-indigo-50";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-md border border-transparent px-5 py-3 text-base font-medium first-letter:bg-white ${className}`}
    >
      {text}
    </Link>
  );
}
