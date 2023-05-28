import { FaInfoCircle } from "react-icons/fa";
import { MdError, MdOutlineWarningAmber } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import Button from "./Button";

export default function Alert({ type, message, url, action }) {
  switch (type) {
    case "success":
      return (
        <div
          className={`alert-${type} bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-black items-center w-full flex flex-col sm:flex sm:flex-row`}
          role="alert"
        >
          <FaRegCheckCircle className="mr-2" />
          <span className="grow">{message}</span>
          {url && <Button href={url} text={action} primary={true} />}
        </div>
      );
    case "error":
      return (
        <div
          className={`alert-${type} bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-black items-center w-full flex flex-col sm:flex sm:flex-row`}
          role="alert"
        >
          <MdError className="mr-2" />
          <span className="grow">{message}</span>
          {url && <Button href={url} text={action} primary={true} />}
        </div>
      );
    case "warning":
      return (
        <div
          className={`alert-${type} bg-yellow-100 rounded-lg py-5 px-6 mb-3 text-base text-black w-full flex flex-col sm:flex sm:flex-row`}
          role="alert"
        >
          <div className="grow inline-flex items-center">
            <MdOutlineWarningAmber className="mr-2" />
            <span>{message}</span>
          </div>
          {url && <Button href={url} text={action} primary={true} />}
        </div>
      );
    case "info":
      return (
        <div
          className={`alert-${type} bg-blue-100 rounded-lg py-5 px-6 mb-3 text-base text-black items-center w-full  flex flex-col sm:flex sm:flex-row`}
          role="alert"
        >
          <FaInfoCircle className="mr-2" />
          <span className="grow">{message}</span>
          {url && <Button href={url} text={action} primary={true} />}
        </div>
      );
  }
}
