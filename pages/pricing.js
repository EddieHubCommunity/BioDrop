import { Fragment } from "react";
import { CheckIcon, MinusIcon } from "@heroicons/react/20/solid";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import Page from "@components/Page";
import PageHead from "@components/PageHead";
import { classNames } from "@services/utils/classNames";
import Button from "@components/Button";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let user = { isLoggedIn: false, isPremium: false };

  if (session) {
    user = {
      isLoggedIn: true,
      accountType: session.accountType,
    };
  }

  return {
    props: { user },
  };
}

export default function Premium({ user }) {
  const tiers = [
    {
      name: "Free",
      id: "tier-free",
      priceMonthly: "$0",
      frequency: "Forever",
      description:
        "Create your Profile with unlimited links and connect to the community.",
      mostPopular: false,
      button: {
        label: () => {
          if (user.isLoggedIn && user.accountType === "premium") {
            return "Revert to Free";
          }
          if (user.isLoggedIn && user.accountType === "free") {
            return "Your current plan";
          }
          if (!user.isLoggedIn) {
            return "Join for FREE";
          }
        },
        action: () => {
          if (user.isLoggedIn && user.accountType === "premium") {
            return "/api/stripe";
          }
          if (user.isLoggedIn && user.accountType === "free") {
            return "/pricing";
          }
          if (!user.isLoggedIn) {
            return "/auth/signin";
          }
        },
        isDisabled: () => {
          if (user.isLoggedIn && user.accountType === "free") {
            return true;
          }
          return false;
        },
        onClick: () => {},
      },
    },
    {
      name: "Premium",
      id: "tier-premium",
      priceMonthly: "$5",
      frequency: "/month",
      description:
        "Customise your Profile further to reach a greater audience.",
      mostPopular: true,
      badge: "Free 30 day trial (NO credit card required)",
      button: {
        label: () => {
          if (user.isLoggedIn && user.accountType === "premium") {
            return "Already";
          }
          if (user.isLoggedIn && user.accountType === "free") {
            return "Upgrade";
          }
          if (!user.isLoggedIn) {
            return "Sign up";
          }
        },
        action: () => {
          if (user.isLoggedIn && user.accountType === "premium") {
            return "/api/stripe";
          }
          if (user.isLoggedIn && user.accountType === "free") {
            return "/api/stripe";
          }
          if (!user.isLoggedIn) {
            return "/auth/signin";
          }
        },
        isDisabled: () => {
          if (user.isLoggedIn && user.accountType === "premium") {
            return true;
          }
          return false;
        },
        onClick: () => {
          if (typeof window !== "undefined" && window.localStorage) {
            if (user.accountType !== "premium") {
              localStorage.setItem("premium-intent", true);
            }
          }
        },
      },
    },
  ];

  const sections = [
    {
      name: "Profile Features",
      features: [
        {
          name: "Tags",
          description:
            "Make your Profile more discoverable with tags that describe your interests and expertise",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Unlimited Links",
          description:
            "There is no limit on the number of links you can add to your Profile",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Link Groups",
          description:
            "Keep all related links in a group of your choosing, for example: Content or Business",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Social Icons",
          description:
            "Promote your favourite links at the top of your Profile",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Milestones",
          description:
            "Add your career highlights, important achievements and future goals in this resumé style feature",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Testimonials",
          description:
            "Show off the great feedback you have received from other GitHub users",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Events",
          description:
            "Hosting, speaking or attending an event? Let people know what you are up to",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "GitHub Repositories",
          description:
            "Whether you maintain or contribute to a GitHub Repo bring this to the attention of other BioDrop users",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "QR Code",
          description: "Share your Profile easily with others",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Hide Header/Footer",
          description:
            "Make your Profile more your own by removing the BioDrop header and/or footer",
          tiers: { Free: false, Premium: true },
        },
        {
          name: "Premium Badge",
          description:
            "Make your Profile standout with a Premium badge on your Profile",
          tiers: { Free: false, Premium: true },
        },
      ],
    },
    {
      name: "Community Features",
      features: [
        {
          name: "Community Profile Search",
          description:
            "Search all BioDrop Profiles - you can search by name or tags",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Community Events",
          description:
            "See all the events added by BioDrop users, with helpful filters such CFP dates, is the event virtual/in person or free/paid",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Community Maps",
          description: "See where BioDrop users are in the World",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Community GitHub Repositories",
          description:
            "See all GitHub Repos added by BioDrop users and sort by forks, stars or activity date",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Discover",
          description:
            "See a list of all those BioDrop Profiles which have been recently updated on the Search Page",
          tiers: { Free: true, Premium: true },
        },
        // {
        //   name: "Featured Profiles",
        //   description: "",
        //   tiers: { Free: false, Premium: true },
        // },
      ],
    },
    {
      name: "Reporting",
      features: [
        {
          name: "Total Profile Views",
          description: "Analytics on the total number of views of your Profile",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Total Daily Profile Views",
          description:
            "Analytics on the total number of views of your Profile per day over the last 30 days",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Total Link Clicks",
          description:
            "Analytics on the total number of clicks on your Profile links",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Individual Link Clicks",
          description:
            "Analytics on the total number of clicks for each individual link in your Profile",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Total Daily Link Clicks",
          description:
            "Analytics on the total number of clicks for each individual link in your Profile per day over the last 30 days",
          tiers: { Free: false, Premium: true },
        },
        {
          name: "Views by Country",
          description:
            "Analytics on the country where your Profile visitors are from",
          tiers: { Free: false, Premium: true },
        },
        {
          name: "Views by Source",
          description:
            "Analytics on where visitors are finding and clicking your Profile link from, for example; Twitter, GitHub",
          tiers: { Free: false, Premium: true },
        },
      ],
    },
    {
      name: "Support",
      features: [
        {
          name: "Community Discord",
          description:
            "Share ideas, ask questions, collaborate and network with other BioDrop users and EddieHub members",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Roadmap Call",
          description:
            "Meet the founders and let them know what new features you want to see",
          tiers: { Free: false, Premium: true },
        },
        {
          name: "Contact Form",
          description: "For queries on your Premium account",
          tiers: { Free: false, Premium: true },
        },
      ],
    },
  ];

  const badge = (
    text,
    classnames1 = "shadow-xl shadow-green-500/50",
    classnames2 = "motion-safe:animate-ping",
  ) => (
    <span
      className={classNames(
        "inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-primary-medium dark:text-primary-low ring-1 ring-inset ring-green-500 mb-4",
        classnames1,
      )}
    >
      <svg
        className={classNames("h-1.5 w-1.5 fill-green-500", classnames2)}
        viewBox="0 0 6 6"
        aria-hidden="true"
      >
        <circle cx={3} cy={3} r={3} />
      </svg>
      {text}
    </span>
  );

  return (
    <>
      <PageHead
        title="BioDrop Premium Features Pricing"
        description="BioDrop is 100% Open Source and FREE, but we will have some paid Premium features in the future"
      />
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Pricing</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-medium dark:text-primary-low-medium">
          Select the plan that is right for you.
        </p>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* xs to lg */}
          <div className="mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden">
            {tiers.map((tier) => (
              <section
                key={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "rounded-xl bg-gray-400/5 ring-1 ring-inset ring-gray-200"
                    : "",
                  "p-8",
                )}
              >
                <h3
                  id={tier.id}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {tier.name}
                </h3>
                {tier.badge && badge(tier.badge)}
                <p className="mt-2 flex items-baseline gap-x-1 text-gray-900 mb-2">
                  <span className="text-4xl font-bold text-primary-medium dark:text-primary-low">
                    {tier.priceMonthly}
                  </span>
                  <span className="text-sm font-semibold text-primary-medium dark:text-primary-low">
                    {tier.frequency}
                  </span>
                </p>
                <p className="mb-4">{tier.description}</p>
                <Button
                  primary={true}
                  disable={tier.button.isDisabled()}
                  aria-describedby={tier.id}
                  href={tier.button.action()}
                  onClick={() => tier.button.onClick()}
                >
                  {tier.button.label()}
                </Button>
                <ul
                  role="list"
                  className="mt-10 space-y-4 text-sm leading-6 text-gray-900"
                >
                  {sections.map((section) => (
                    <li key={section.name}>
                      <ul
                        role="list"
                        className="space-y-4 text-primary-medium dark:text-primary-low"
                      >
                        {section.features.map((feature) =>
                          feature.tiers[tier.name] ? (
                            <li key={feature.name} className="flex gap-x-3">
                              <CheckIcon
                                className="h-6 w-5 flex-none text-indigo-600"
                                aria-hidden="true"
                              />
                              <span>
                                {feature.name}{" "}
                                {typeof feature.tiers[tier.name] ===
                                "string" ? (
                                  <span className="text-sm leading-6 text-gray-500">
                                    ({feature.tiers[tier.name]})
                                  </span>
                                ) : null}
                              </span>
                            </li>
                          ) : null,
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* lg+ */}
          <div className="isolate hidden lg:block">
            <div className="relative -mx-8">
              {tiers.some((tier) => tier.mostPopular) ? (
                <div className="absolute inset-x-4 inset-y-0 -z-10 flex">
                  <div
                    className="flex w-1/3 px-4"
                    aria-hidden="true"
                    style={{
                      marginLeft: `${
                        (tiers.findIndex((tier) => tier.mostPopular) + 1) * 33
                      }%`,
                    }}
                  >
                    <div className="w-full rounded-t-xl border-x border-t border-gray-900/10 bg-gray-400/5" />
                  </div>
                </div>
              ) : null}
              <table className="w-full table-fixed border-separate border-spacing-x-8 text-left">
                <caption className="sr-only">Pricing plan comparison</caption>
                <colgroup>
                  <col className="w-1/3" />
                  <col className="w-1/3" />
                  <col className="w-1/3" />
                </colgroup>
                <thead>
                  <tr>
                    <td />
                    {tiers.map((tier) => (
                      <th
                        key={tier.id}
                        scope="col"
                        className="px-6 pt-6 xl:px-8 xl:pt-8"
                      >
                        {tier.badge && badge(tier.badge)}
                        <div className="text-2xl font-semibold leading-7 text-primary-medium dark:text-primary-low-medium">
                          {tier.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <span className="sr-only">Price</span>
                    </th>
                    {tiers.map((tier) => (
                      <td key={tier.id} className="px-6 pt-2 xl:px-8">
                        <div className="flex items-baseline gap-x-1 text-primary-medium dark:text-primary-low mb-2">
                          <span className="text-4xl font-bold">
                            {tier.priceMonthly}
                          </span>
                          <span className="text-sm font-semibold leading-6">
                            {tier.frequency}
                          </span>
                        </div>
                        <p className="mb-4">{tier.description}</p>
                        <Button
                          disable={tier.button.isDisabled()}
                          primary={true}
                          href={tier.button.action()}
                          onClick={() => tier.button.onClick()}
                        >
                          {tier.button.label()}
                        </Button>
                      </td>
                    ))}
                  </tr>
                  {sections.map((section, sectionIdx) => (
                    <Fragment key={section.name}>
                      <tr>
                        <th
                          scope="colgroup"
                          colSpan={4}
                          className={classNames(
                            sectionIdx === 0 ? "pt-8" : "pt-16",
                            "pb-4 font-semibold leading-6 text-gray-900",
                          )}
                        >
                          {section.name}
                          <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/10" />
                        </th>
                      </tr>
                      {section.features.map((feature) => (
                        <tr key={feature.name}>
                          <th
                            scope="row"
                            className="py-4 text-sm font-normal leading-6 text-gray-900"
                          >
                            <p className="font-bold">{feature.name}</p>
                            <p className="italic">{feature.description}</p>
                            <div className="absolute inset-x-8 mt-4 h-px bg-gray-900/5" />
                          </th>
                          {tiers.map((tier) => (
                            <td key={tier.id} className="px-6 py-4 xl:px-8">
                              {typeof feature.tiers[tier.name] === "string" ? (
                                <div className="text-center text-sm leading-6 text-gray-500">
                                  {feature.tiers[tier.name]}
                                </div>
                              ) : (
                                <>
                                  {feature.tiers[tier.name] === true ? (
                                    <CheckIcon
                                      className="mx-auto h-5 w-5 text-indigo-600"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <MinusIcon
                                      className="mx-auto h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  )}

                                  <span className="sr-only">
                                    {feature.tiers[tier.name] === true
                                      ? "Included"
                                      : "Not included"}{" "}
                                    in {tier.name}
                                  </span>
                                </>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}
