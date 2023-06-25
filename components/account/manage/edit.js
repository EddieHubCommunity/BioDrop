import { PencilIcon } from "@heroicons/react/24/outline";

export default function Edit({ href, children }) {
  return (
    <div className="relative w-full">
      <a
        href={href}
        className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 absolute top-0 right-0 pointer z-50"
      >
        <PencilIcon className="h-5 w-5" aria-hidden="true" />
      </a>
      {children}
    </div>
  );
}
