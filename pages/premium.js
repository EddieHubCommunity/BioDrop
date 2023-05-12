import Script from "next/script";
import { useRouter } from "next/router";

import { FaCheck } from "react-icons/fa";

import Page from "@components/Page";
import PageHead from "@components/PageHead";
import Alert from "@components/Alert";

export default function Premium() {
  const router = useRouter();
  const success = router.query.success;

  const features = [
    {
      name: "Unlimited Profiles",
      // description: "Rerum repellat labore necessitatibus.",
    },
    {
      name: "Custom Domain",
    },
    {
      name: "Detailed Analytics",
    },
    {
      name: "Widgets for your content",
    },
    {
      name: "Early access to Beta features",
    },
    {
      name: "Discover page",
    },
    {
      name: "Remove header / footer",
    },
    {
      name: "Themes",
    },
  ];

  return (
    <>
      <PageHead
        title="LinkFree Premium Features"
        description="LinkFree is 100% Open Source and FREE, but we will have some paid Premium features in the future"
      />
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Premium</h1>

        {success && (
          <Alert
            type="success"
            message="Thank you for subscribing. We will notified you when paid features go live"
          />
        )}

        <div className="bg-white dark:bg-primary-high py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <div>
                <h2 className="text-base font-semibold leading-7 text-secondary-medium dark:text-secondary-low ">
                  Super charge your Profile from $5/month
                </h2>
                <p className="mt-2 text-2xl font-bold tracking-tight text-primary-high dark:text-white sm:text-3xl">
                  Upcoming paid features
                </p>
                <p className="my-6 text-base leading-7 text-primary-low-high">
                  Sign up to be notified when Premium Features are available (no
                  obligation)
                </p>
                <div className="kartra_optin_container182be0c5cdcd5072bb1864cdee4d3d6e"></div>
                <Script src="https://app.kartra.com/optin/WUzmL8l9nFXc" />
              </div>
              <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="font-semibold text-primary-high dark:text-white">
                      <FaCheck
                        className="absolute left-0 top-1 h-5 w-5 text-secondary-medium dark:text-secondary-low"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>
                    {feature.description && (
                      <dd className="mt-2">{feature.description}</dd>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}
