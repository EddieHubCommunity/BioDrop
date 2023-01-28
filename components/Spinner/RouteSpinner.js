import getIcon from "../Icon";
export default function RouteSpinner() {
  const Icon = getIcon("FaSpinner");
  return (
    <div className="flex fixed z-50 top-0 h-[100%] w-[100%] bg-black bg-opacity-50">
      <div
        role="status"
        className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
      >
        <Icon className="spinner-border animate-spin" />
      </div>
    </div>
  );
}
