import Link from "./Link";

export default function Button({
  text,
  primary = false,
  disable,
  ...restProps
}) {
  let className =
    "inline-flex items-center justify-center rounded-md border border-transparent px-5 py-3 text-base font-medium first-letter:bg-white";
  className += primary
    ? " text-white bg-indigo-600  hover:bg-indigo-700"
    : " text-indigo-600 hover:bg-indigo-50";
  className += disable
    ? " border-2 border-red bg-[#f4f4f4] hover:bg-[#f3f3f3] opacity-[.5] text-[gray] cursor-not-allowed"
    : " cursor-pointer";

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
