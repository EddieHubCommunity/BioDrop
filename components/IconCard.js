import getIcon from "../components/Icon";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function IconCard({ iconName }) {
  const Icon = getIcon(iconName);
  return (
    <>
      <button
        className="border-2 p-2 border-slate-100 w-24 h-24 flex flex-col items-center justify-around rounded hover:border-indigo-600 hover:cursor-pointer active:border-green-600 focus:border-green-600"
        onClick={() => {
          navigator.clipboard.writeText(iconName);
          toast.success(`Copied ${iconName} to clipboard`)
        }}
      >
        <Icon className="h-7 w-7 fill-grey-700" />
        <p className="w-full text-xs break-words text-center text-zinc-500">
          {iconName}
        </p>
      </button>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}
