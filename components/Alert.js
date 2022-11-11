import { FaInfoCircle } from "react-icons/fa";
import { MdError, MdOutlineWarningAmber } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";

export default function alert({ type, message }) {
  switch (type) {
    case "success":
      return (
        <div
          className="bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full animate-pulse"
          role="alert"
        >
          <BsCheckCircleFill className="mr-2" />
          <span>{message}</span>
        </div>
      );
      break;
    case "error":
      return (
        <div
          className="bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full animate-pulse"
          role="alert"
        >
          <MdError className="mr-2" />
          <span>{message}</span>
        </div>
      );
      break;
    case "warning":
      return (
        <div
          className="bg-yellow-100 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full animate-pulse"
          role="alert"
        >
          <MdOutlineWarningAmber className="mr-2" />
          <span>{message}</span>
        </div>
      );
      break;
    case "info":
      return (
        <div
          className="bg-blue-100 rounded-lg py-5 px-6 mb-3 text-base text-blue-700 inline-flex items-center w-full animate-pulse"
          role="alert"
        >
          <FaInfoCircle className="mr-2" />
          <span>{message}</span>
        </div>
      );
      break;
  }
}
