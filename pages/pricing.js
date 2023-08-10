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
  console.log(user);
  const tiers = [
    {
      name: "Free",
      id: "tier-free",
      href: "#",
      priceMonthly: "$0",
      description: "Quis suspendisse ut fermentum neque vivamus non tellus.",
      mostPopular: false,
      button: {
        label: () => {
          if (user.isLoggedIn && user.accountType === "premium") {
            return "Downgrade";
          }
          if (user.isLoggedIn && user.accountType === "free") {
            return "Already";
          }
          if (!user.isLoggedIn) {
            return "Sign up";
          }
        },
        action: () => {},
        isDisabled: () => {
          if (user.isLoggedIn && user.accountType === "free") {
            return true;
          }
          return false;
        },
      },
    },
    {
      name: "Premium",
      id: "tier-premium",
      href: "#",
      priceMonthly: "$5",
      description: "Quis eleifend a tincidunt pellentesque. A tempor in sed.",
      mostPopular: true,
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
        action: () => {},
        isDisabled: () => {
          if (user.isLoggedIn && user.accountType === "premium") {
            return true;
          }
          return false;
        },
      },
    },
  ];

  const sections = [
    {
      name: "Features",
      features: [
        {
          name: "Integrations",
          tiers: { Basic: true, Premium: true },
        },
        {
          name: "Shared links",
          tiers: { Basic: true, Essential: true },
        },
        {
          name: "Importing and exporting",
          tiers: { Essential: true },
        },
        {
          name: "Team members",
          tiers: { Essential: "Up to 20 users" },
        },
      ],
    },
    {
      name: "Reporting",
      features: [
        {
          name: "Advanced analytics",
          tiers: { Basic: true, Essential: true },
        },
        { name: "Basic reports", tiers: { Essential: true } },
      ],
    },
    {
      name: "Support",
      features: [
        {
          name: "24/7 online support",
          tiers: { Basic: true, Essential: true },
        },
        {
          name: "Quarterly product workshops",
          tiers: { Essential: true },
        },
        {
          name: "Priority phone support",
          tiers: { Essential: true },
        },
      ],
    },
  ];

  return (
    <>
      <PageHead
        title="LinkFree Premium Features"
        description="LinkFree is 100% Open Source and FREE, but we will have some paid Premium features in the future"
      />
      <Page>
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Pricing
              </h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Plans for teams of&nbsp;all&nbsp;sizes
              </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
              Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et
              quasi iusto modi velit ut non voluptas in. Explicabo id ut
              laborum.
            </p>

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
                  <h3
                    id={tier.id}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    {tier.name}
                  </h3>
                  <p className="mt-2 flex items-baseline gap-x-1 text-gray-900">
                    <span className="text-4xl font-bold">
                      {tier.priceMonthly}
                    </span>
                    <span className="text-sm font-semibold">/month</span>
                  </p>
                  <Button
                    disable={tier.button.isDisabled()}
                    aria-describedby={tier.id}
                  >
                    {tier.button.label()}
                  </Button>
                  <ul
                    role="list"
                    className="mt-10 space-y-4 text-sm leading-6 text-gray-900"
                  >
                    {sections.map((section) => (
                      <li key={section.name}>
                        <ul role="list" className="space-y-4">
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
            <div className="isolate mt-20 hidden lg:block">
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
                          <div className="text-sm font-semibold leading-7 text-gray-900">
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
                          <div className="flex items-baseline gap-x-1 text-gray-900">
                            <span className="text-4xl font-bold">
                              {tier.priceMonthly}
                            </span>
                            <span className="text-sm font-semibold leading-6">
                              /month
                            </span>
                          </div>
                          <Button
                            disable={tier.button.isDisabled()}
                            primary={true}
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
                                {typeof feature.tiers[tier.name] ===
                                "string" ? (
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
        </div>
      </Page>
    </>
  );
}
