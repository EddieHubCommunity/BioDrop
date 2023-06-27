import PencilIcon from "@heroicons/react/24/outline/PencilIcon";

export default function Edit({ href, children }) {
  return (
    <div className="relative w-full">
      <a
        href={href}
        className="rounded-full bg-secondary-medium p-2 text-white shadow-sm hover:bg-secondary-medium-low focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-medium absolute top-0 left-0 pointer z-50"
      >
        <PencilIcon className="h-5 w-5" aria-hidden="true" />
      </a>
      {children}
    </div>
  );
}
