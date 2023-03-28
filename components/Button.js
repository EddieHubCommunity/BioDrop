import Link from "./Link";

export default function Button({ text, disable, ...restProps }) {
  let className =
    "inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 m-4 text-base font-medium first-letter:bg-white";

  className += disable
    ? " border-2 border-red bg-gray-50 hover:bg-gray-50 text-gray-300 cursor-not-allowed"
    : " text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer";

  const link = (
    <Link className={className} {...restProps}>
      {text}
    </Link>
  );

  const button = (
    <button className={className} disabled={disable} {...restProps}>
      {text}
    </button>
  );

  return restProps.href ? link : button;
}
