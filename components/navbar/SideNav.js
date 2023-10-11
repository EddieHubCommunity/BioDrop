import { Disclosure } from "@headlessui/react";
import ChevronRightIcon from "@heroicons/react/20/solid/ChevronRightIcon";
import EditOnGitHub from "@components/EditOnGithub";
import { useRouter } from "next/router";
import { classNames } from "@services/utils/classNames";
import Link from "@components/Link";

export default function SideNav({ navigation }) {
  const { pathname } = useRouter();
  return (
    <ul
      role="list"
      className="sm:w-64 flex-none block rounded border border-primary-high dark:border-primary-low sm:border-none mt-4 sm:mt-12"
    >
      <li>
        <ul role="list">
          {navigation.map((item) => (
            <li key={item.name} className="my-2">
              {!item.children ? (
                <Link
                  href={item.href}
                  className={classNames(
                    item.href == pathname &&
                      "bg-slate-200 dark:bg-primary-low !text-secondary-high",
                    "group flex gap-x-3 rounded-md py-2 pl-3 pr-2 text-md leading-6 font-semibold text-primary-high dark:text-primary-low-medium hover:text-secondary-high dark:hover:text-secondary-high hover:bg-slate-200 dark:hover:bg-primary-low duration-200",
                  )}
                >
                  {/* <item.icon
                  className="h-6 w-6 shrink-0 text-primary-low-medium"
                    aria-hidden="true"
                  /> */}
                  {item.name}
                </Link>
              ) : (
                <Disclosure as="div">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={classNames(
                          item.children?.filter(
                            (subItem) => subItem.href == pathname,
                          )?.[0]?.href == pathname &&
                            "bg-slate-200 dark:bg-primary-low !text-secondary-high",
                          "group flex items-center w-full text-left rounded-md py-2 pl-3 pr-2 gap-x-3 text-sm leading-6 font-semibold text-primary-high dark:text-primary-low-medium hover:text-secondary-high dark:hover:text-secondary-high hover:bg-slate-200 dark:hover:bg-primary-low duration-200",
                        )}
                      >
                        {/* <item.icon
                              className="h-6 w-6 shrink-0 text-primary-low-medium"
                              aria-hidden="true"
                            /> */}
                        {item.name}
                        <ChevronRightIcon
                          className={classNames(
                            open && "rotate-90",
                            "ml-auto h-5 w-5 shrink-0 text-primary-low-medium group-hover:text-secondary-high",
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>

                      <Disclosure.Panel as="ul" className="mt-1 pl-5 pr-2">
                        {item.children.map((subItem) => (
                          <li key={subItem.name}>
                            {/* 44px */}
                            <Disclosure.Button
                              as="a"
                              href={subItem.href}
                              className={classNames(
                                subItem.href.toLowerCase() == pathname &&
                                  "text-secondary-medium dark:!text-secondary-medium font-semibold",
                                "block hover:font-semibold hover:text-secondary-medium dark:hover:text-secondary-medium  rounded-md my-[6px] py-[6px] pr-2 pl-4 text-sm leading-6 text-primary-high dark:text-primary-low-medium duration-200",
                              )}
                            >
                              {subItem.name}
                            </Disclosure.Button>
                          </li>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              )}
            </li>
          ))}
        </ul>
      </li>
      <EditOnGitHub />
    </ul>
  );
}
