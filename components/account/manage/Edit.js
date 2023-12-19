import PencilIcon from "@heroicons/react/24/outline/PencilIcon";

export default function Edit({ href, label = "", children }) {
  return (
    <div className="flex-none rounded-full  bg-secondary-medium p-2 text-white shadow-sm hover:bg-tertiary-medium  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-secondary-medium pointer z-10">
      <a href={href} aria-label={`Edit ${label}`}>
        <PencilIcon className="h-5 w-5" aria-hidden="true" />
      </a>
      {children}
    </div>
  );
}
