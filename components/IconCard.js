import { useState } from "react";
import getIcon from "@components/Icon";
import Notification from "@components/Notification";

export default function IconCard({ iconName }) {
  const [showNotification, setShowNotification] = useState(false);
  const Icon = getIcon(iconName);
  return (
    <>
      <button
        className="border-2 p-2 border-slate-100 w-24 h-24 flex flex-col items-center justify-around rounded hover:border-secondary-high hover:cursor-pointer active:border-green-600 focus:border-green-600"
        onClick={() => {
          navigator.clipboard.writeText(iconName);
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 1500);
        }}
      >
        <Icon className="h-7 w-7 fill-grey-700" />
        <p className="w-full text-xs break-words text-center text-zinc-500">
          {iconName}
        </p>
      </button>
      <Notification
        show={showNotification}
        type="success"
        onClose={() => setShowNotification(false)}
        message="Successfully copied!"
        additionalMessage={`Copied ${iconName} to clipboard`}
      />
    </>
  );
}
