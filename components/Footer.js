import va from "@vercel/analytics";

import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

import RocketLaunchIcon from "@heroicons/react/20/solid/RocketLaunchIcon";
import Link from "@components/Link";
import app from "@config/app.json";
import { BASE_GITHUB_PROJECT_URL, BASE_GITHUB_URL } from "@constants/index";
import LogoWide from "@public/logos/LogoWide";

export default function Footer() {
  const navigation = {
    solutions: [
      { name: "Search", href: "/search", external: false },
      { name: "Events", href: "/events", external: false },
      { name: "Map", href: "/map", external: false },
      { name: "Login", href: "/auth/signin", external: false },
      {
        name: "Open Source Roadmap",
        href: "/docs/open-source-roadmap",
        external: false,
      },
    ],
    support: [
      { name: "Documentation", href: "/docs", external: false },
      {
        name: "Create Profile with JSON",
        href: "/docs/quickstart-json",
        external: false,
      },
      {
        name: "Create Profile with Forms",
        href: "/docs/quickstart-forms",
        external: false,
      },
      { name: "Json Playground", href: "/playground", external: false },
      {
        name: "Contributing Guide",
        href: BASE_GITHUB_PROJECT_URL + "/blob/main/CONTRIBUTING.md",
        external: true,
      },
      { name: "BioDrop Roadmap", href: "/roadmap", external: false },
    ],
    community: [
      {
        name: "EddieHub GitHub Org",
        href: BASE_GITHUB_URL,
        external: true,
      },
      {
        name: "Maintainers",
        href: "/maintainers",
        external: false,
      },

      {
        name: "Contributors",
        href: BASE_GITHUB_PROJECT_URL + "/graphs/contributors",
        external: true,
      },
      { name: "Resources", href: "/docs/community-resources", external: false },
      {
        name: "Blog & Newsletter",
        href: "https://biodrop.substack.com/",
        external: true,
      },
      { name: `v${app.version}`, href: "/roadmap", external: false },
    ],
    legal: [
      {
        name: "License",
        href: BASE_GITHUB_PROJECT_URL + "/blob/main/LICENSE",
        external: true,
      },
      { name: "Terms", href: "/docs/terms", external: false },
    ],
    social: [
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/biodrop-io/",
        external: true,
        icon: FaLinkedin,
      },
      {
        name: "Twitter",
        href: "https://twitter.com/biodrop_io/",
        external: true,
        icon: FaXTwitter,
      },
      {
        name: "Instagram",
        href: "https://instagram.com/biodrop_io/",
        external: true,
        icon: FaInstagram,
      },
      {
        name: "GitHub",
        href: BASE_GITHUB_PROJECT_URL,
        external: true,
        icon: FaGithub,
      },
      {
        name: "YouTube",
        href: "https://www.youtube.com/watch?v=05HEeCQSKRE&list=PL4lTrYcDuAfyU0fJcCGLm5r-hM_rqXaxd",
        external: true,
        icon: FaYoutube,
      },
    ],
  };

  return (
    <footer className="bg-primary-high" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <LogoWide width={300} />
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Solutions
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-primary-low hover:text-primary-low-high"
                        target={item.external ? "_blank" : "_self"}
                        onClick={() => va.track(`footer`, { link: item.name })}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Support
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-primary-low hover:text-primary-low-high"
                        target={item.external ? "_blank" : "_self"}
                        onClick={() => va.track(`footer`, { link: item.name })}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Community
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.community.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-primary-low hover:text-primary-low-high"
                        target={item.external ? "_blank" : "_self"}
                        onClick={() => va.track(`footer`, { link: item.name })}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-primary-low hover:text-primary-low-high"
                        target={item.external ? "_blank" : "_self"}
                        onClick={() => va.track(`footer`, { link: item.name })}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 flex flex-col md:flex-row   items-center justify-between">
          <div className="flex pb-4 md:pb-0 items-center justify-center gap-x-6 md:order-2 flex-wrap">
            <p className=" text-xs leading-5 text-primary-low-high  md:mt-0 whitespace-nowrap">
              100% Open Source on GitHub
            </p>
            <div className="flex items-center justify-center space-x-6 py-2">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-primary-low-high hover:text-primary-low"
                  target={item.external ? "_blank" : "_self"}
                  onClick={() => va.track(`socials`, { link: item.name })}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <Link
            href={BASE_GITHUB_PROJECT_URL}
            className=" text-primary-low-high hover:text-primary-low flex justify-center space-x-6 md:order-1 gap-2"
            onClick={() => va.track(`footer`, { link: "powered by EddieHub" })}
          >
            <RocketLaunchIcon className="h-6 w-6" aria-hidden="true" />
            Powered by EddieHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
