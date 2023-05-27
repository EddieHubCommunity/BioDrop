import Image from "next/image";
import { FaGithub, FaMoneyBillAlt } from "react-icons/fa";

import Link from "./Link";

export default function GitHubAccelerator() {
  return (
    <div className="mb-12">
      <div>
        <Image
          className="h-32 w-full object-cover lg:h-48"
          src="https://user-images.githubusercontent.com/624760/235968674-01cc3149-f9c3-48e2-9dc5-677789de8456.png"
          alt="GitHub Accelerator banner"
          width={600}
          height={200}
        />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <Image
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src="https://user-images.githubusercontent.com/624760/235977104-a0b6ae9c-1d02-489c-ae26-1311c20fd3d4.png"
              alt="GitHub logo"
              width={100}
              height={100}
            />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <p className="truncate text-2xl font-bold text-primary-high dark:text-primary-low">
                GitHub Accelerator Program
              </p>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link
                href="http://accelerator.github.com"
                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-primary-high dark:text-primary-high shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-slate-200 cursor-pointer"
                target="_blank"
              >
                <FaGithub
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-primary-high dark:text-primary-high"
                  aria-hidden="true"
                />
                <span>GitHub Accelerator</span>
              </Link>
              <Link
                href="https://github.com/sponsors/eddiejaoude"
                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold dark:text-primary-high shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-slate-200 cursor-pointer"
                target="_blank"
              >
                <FaMoneyBillAlt
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-primary-high dark:text-primary-high"
                  aria-hidden="true"
                />
                <span>GitHub Sponsors</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <p className="truncate text-2xl font-bold text-primary-high dark:text-primary-low">
            GitHub Accelerator Program
          </p>
        </div>
      </div>
    </div>
  );
}
