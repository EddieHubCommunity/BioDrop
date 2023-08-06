import { Disclosure } from "@headlessui/react";
import ChevronRightIcon from "@heroicons/react/20/solid/ChevronRightIcon";
import EditOnGitHub from "@components/EditOnGithub";
import { classNames } from "utils/functions/classNames";

export default function SideNav({ navigation }) {
  return (
    <ul role="list" className="w-64 flex-none hidden sm:block mt-12">
      <li>
        <ul role="list">
          {navigation.map((item) => (
            <li key={item.name}>
              {!item.children ? (
                <a
                  href={item.href}
                  className={classNames(
                    item.current ? "bg-primary-low" : "hover:bg-primary-low",
                    "group flex gap-x-3 rounded-md p-2 text-md leading-6 font-semibold text-primary-high dark:text-primary-low-medium dark:hover:text-secondary-high hover:text-secondary-high"
                  )}
                >
                  {/* <item.icon
                  className="h-6 w-6 shrink-0 text-primary-low-medium"
                    aria-hidden="true"
                  /> */}
                  {item.name}
                </a>
              ) : (
                <Disclosure as="div">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={classNames(
                          item.current
                            ? "bg-primary-low"
                            : "hover:bg-primary-low",
                          "flex hover:text-secondary-high dark:hover:text-secondary-high group items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-primary-high dark:text-primary-low-medium"
                        )}
                      >
                        {/* <item.icon
                              className="h-6 w-6 shrink-0 text-primary-low-medium"
                              aria-hidden="true"
                            /> */}
                        {item.name}
                        <ChevronRightIcon
                          className={classNames(
                            open
                              ? "rotate-90 text-primary-low-medium"
                              : "text-primary-low-medium",
                            "ml-auto h-5 w-5 shrink-0 group-hover:text-secondary-high"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel as="ul" className="mt-1 px-2">
                        {item.children.map((subItem) => (
                          <li key={subItem.name}>
                            {/* 44px */}
                            <Disclosure.Button
                              as="a"
                              href={subItem.href}
                              className={classNames(
                                subItem.current
                                  ? "bg-primary-low"
                                  : "hover:bg-primary-low",
                                "block hover:text-secondary-high dark:hover:text-secondary-high rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-primary-high dark:text-primary-low-medium"
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
