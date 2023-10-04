import Button from "@components/Button";
import DocumentMinusIcon from "@heroicons/react/24/outline/DocumentMinusIcon";

export default function Delete({ action, id, label = "", children }) {
  return (
    <div className="relative w-full">
      <Button
        onClick={() => action(id)}
        aria-label={`Delete ${label}`}
        title={`Delete ${label}`}
        className="rounded-full bg-red-500 p-2 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-medium absolute top-0 right-0 pointer z-50"
        overrideClassNames={true}
      >
        <DocumentMinusIcon className="h-5 w-5" aria-hidden="true" />
      </Button>
      {children}
    </div>
  );
}
