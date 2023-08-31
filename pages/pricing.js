import { Fragment } from "react";
import { CheckIcon, MinusIcon } from "@heroicons/react/20/solid";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { clientEnv } from "@config/schemas/clientSchema";
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
    props: { user, clientEnv },
  };
}

export default function Premium({ user, clientEnv }) {
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
            return "/api/stripe"; //return clientEnv.STRIPE_MANAGE_PLAN_URL;
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
      badge: "30 days FREE trial",
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
            return clientEnv.STRIPE_MANAGE_PLAN_URL;
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
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Unlimited Links",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Link Groups",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Social Icons",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Milestones",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Testimonials",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Events",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "GitHub Repositories",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "QR Code",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Hide Header/Footer",
          tiers: { Free: false, Premium: true },
        },
      ],
    },
    {
      name: "Community Features",
      features: [
        {
          name: "Community Profile Search",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Community Events",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Community Maps",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Community GitHub Repositories",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Discover",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Featured Profiles",
          tiers: { Free: false, Premium: true },
        },
      ],
    },
    {
      name: "Reporting",
      features: [
        {
          name: "Total Profile Views",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Total Daily Profile Views",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Total Link Clicks",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Individual Link Clicks",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Total Daily Link Clicks",
          tiers: { Free: false, Premium: true },
        },
        {
          name: "Views by Country",
          tiers: { Free: false, Premium: true },
        },
        {
          name: "Views by Source",
          tiers: { Free: false, Premium: true },
        },
      ],
    },
    {
      name: "Support",
      features: [
        {
          name: "Community Discord",
          tiers: { Free: true, Premium: true },
        },
        {
          name: "Monthly 1 hour roadmap call (meet the founders and let them know what new features you want to see)",
          tiers: { Free: false, Premium: true },
        },
        {
          name: "Contact Form",
          tiers: { Free: false, Premium: true },
        },
      ],
    },
  ];

  const badge = (text) => (
    <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-primary-medium dark:text-primary-low ring-1 ring-inset ring-green-500 shadow-xl shadow-green-500/50">
      <svg
        className="h-1.5 w-1.5 fill-green-500 animate-ping"
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
        title="LinkFree Premium Features Pricing"
        description="LinkFree is 100% Open Source and FREE, but we will have some paid Premium features in the future"
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
                  "p-8"
                )}
              >
                <div className="flex justify-between">
                  <h3
                    id={tier.id}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    {tier.name}
                  </h3>
                  {tier.badge && badge(tier.badge)}
                </div>
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
                          ) : null
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
                        <div className="flex justify-between">
                          <div className="text-2xl font-semibold leading-7 text-primary-medium dark:text-primary-low-medium">
                            {tier.name}
                          </div>
                          {tier.badge && badge(tier.badge)}
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
                            "pb-4 text-sm font-semibold leading-6 text-gray-900"
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
                            {feature.name}
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
