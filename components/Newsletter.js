import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import Script from "next/script";

export default function Newsletter() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 mb-8 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <div className="mt-6 flex max-w-md gap-x-4">
              <div className="kartra_optin_container1c383cd30b7c298ab50293adfecb7b18"></div>
              <Script src="https://app.kartra.com/optin/08THVCBzqGlF"></Script>
            </div>
          </div>
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Subscribe to learn more
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                Do not miss out, here is why...
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <CalendarDaysIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-4 font-semibold text-white">
                  Regular information
                </div>
                <div className="mt-2 leading-7 text-gray-400">
                  This will include latest features, upcoming releases and
                  offers.
                </div>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <HandRaisedIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-4 font-semibold text-white">No spam</div>
                <div className="mt-2 leading-7 text-gray-400">
                  We will not send out information more than once per month.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        aria-hidden="true"
      >
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
