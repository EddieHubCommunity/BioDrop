import PencilIcon from "@heroicons/react/24/outline/PencilIcon";

export default function Edit({ href, label = "", children }) {
  return (
    <div className="relative w-full">
      <a
        href={href}
        aria-label={`Edit ${label}`}
        className="rounded-full bg-secondary-medium p-2 text-white shadow-sm hover:bg-tertiary-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-medium absolute top-5 right-32  pointer z-10"
      >
        <PencilIcon className="h-4 w-4" aria-hidden="true" />
      </a>
      {children}
    </div>
  );
}
