import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";

export default function Alert({ type, message }) {
  switch (type) {
    case "success":
      return (
        <div
          className={`alert-${type} bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full`}
          role="alert"
        >
          <CheckCircleIcon className="h-5 w-5 mr-2" />
          <span>{message}</span>
        </div>
      );
    case "error":
      return (
        <div
          className={`alert-${type} bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full`}
          role="alert"
        >
          <ExclamationCircleIcon className="h-5 w-5 mr-2" />
          <span>{message}</span>
        </div>
      );
    case "warning":
      return (
        <div
          className={`alert-${type} bg-yellow-100 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full`}
          role="alert"
        >
          <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
          <span>{message}</span>
        </div>
      );
    case "info":
      return (
        <div
          className={`alert-${type} bg-blue-100 rounded-lg py-5 px-6 mb-3 text-base text-blue-700 inline-flex items-center w-full`}
          role="alert"
        >
          <ExclamationCircleIcon className="h-5 w-5 mr-2" />
          <span>{message}</span>
        </div>
      );
  }
}
