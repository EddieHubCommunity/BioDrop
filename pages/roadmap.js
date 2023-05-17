import {
  CheckIcon,
  ComputerDesktopIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

import Page from "@components/Page";
import PageHead from "@components/PageHead";
import Link from "@components/Link";

export default function Roadmap() {
  const releases = [
    {
      name: "Recently released",
      id: "release-recently",
      href: "/changelog",
      external: false,
      actionText: "See full list",
      description: "Enjoy these exciting new features right now!",
      features: [
        "Shorter url",
        "Statistics",
        "Dark mode",
        "Custom login page",
        "Profile QR download",
      ],
      mostPopular: false,
      icon: (
        <CheckIcon
          className="h-6 w-5 flex-none text-secondary-medium dark:text-secondary-low"
          aria-hidden="true"
        />
      ),
    },
    {
      name: "In the works",
      id: "release-in-progress",
      href: "https://github.com/EddieHubCommunity/LinkFree/pulls?q=is%3Apr+is%3Aopen+-label%3A%22✍+chore%3A+profile+addition%22+",
      external: true,
      actionText: "Issue list",
      description: "Features are currently being worked on or will be soon.",
      features: [
        "Forms to manage your profile",
        "Show more detailed statistics",
        "Customise your profile",
        "Premium features",
        "New branding and design",
      ],
      mostPopular: true,
      icon: (
        <ComputerDesktopIcon
          className="h-6 w-5 flex-none text-secondary-medium dark:text-secondary-low"
          aria-hidden="true"
        />
      ),
    },
    {
      name: "Coming soon",
      id: "release-future",
      href: "https://github.com/EddieHubCommunity/LinkFree/issues?q=is%3Aissue+is%3Aopen+no%3Aassignee",
      external: true,
      actionText: "Unassigned issue list",
      description: "Features are being planned for the near future.",
      features: [
        "Follow other Profiles",
        "Notifications",
        "Advanced analytics",
        "Badges",
        "More customisation",
      ],
      mostPopular: false,
      icon: (
        <ClockIcon
          className="h-6 w-5 flex-none text-secondary-medium dark:text-secondary-low"
          aria-hidden="true"
        />
      ),
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <PageHead
        title="LinkFree Roadmap"
        description="Features in progress and coming soon on LinkFree"
      />
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Roadmap</h1>

        <div className="bg-white dark:bg-primary-high pb-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {releases.map((phase, phaseIdx) => (
                <div
                  key={phase.id}
                  className={classNames(
                    phase.mostPopular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8",
                    phaseIdx === 0 ? "lg:rounded-r-none lg:border-r-0" : "",
                    phaseIdx === releases.length - 1
                      ? "lg:rounded-l-none lg:border-l-0"
                      : "",
                    "flex flex-col justify-between rounded-3xl bg-white dark:bg-primary-medium p-8 border-primary-low-medium dark:border-primary-medium-low border  xl:p-10"
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-x-4">
                      <h3
                        id={phase.id}
                        className={classNames(
                          phase.mostPopular
                            ? "text-secondary-medium"
                            : "text-primary-high",
                          "text-lg font-semibold leading-8"
                        )}
                      >
                        {phase.name}
                      </h3>
                      {phase.mostPopular ? (
                        <p className="rounded-full bg-secondary-medium/10 dark:bg-secondary-low px-2.5 py-1 text-xs font-semibold leading-5 text-secondary-medium dark:text-secondary-high-high">
                          GEEK out with us!
                        </p>
                      ) : null}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-primary-medium dark:text-primary-low-medium">
                      {phase.description}
                    </p>
                    <ul
                      role="list"
                      className="mt-8 space-y-3 text-sm leading-6 text-primary-medium dark:text-primary-low-medium  "
                    >
                      {phase.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          {phase.icon}
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={phase.href}
                    target={phase.external ? "_blank" : "_self"}
                    aria-describedby={phase.id}
                    className={classNames(
                      phase.mostPopular
                        ? "bg-secondary-medium  text-white shadow-sm hover:bg-secondary-medium-low"
                        : "text-secondary-medium dark:text-secondary-low border border-secondary-medium dark:border-white dark:hover:border-secondary-low hover:border-secondary-low",
                      "mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-medium"
                    )}
                  >
                    {phase.actionText}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}
