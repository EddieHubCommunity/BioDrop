import Image from "next/image";

import {
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaRocket,
  FaDollarSign,
} from "react-icons/fa";
import Button from "./Button";
import Link from "@components/Link";

export default function Footer() {
  const navigation = {
    solutions: [
      { name: "Search", href: "/search", external: false },
      { name: "Events", href: "/events", external: false },
      { name: "Map", href: "/map", external: false },
      { name: "Premium", href: "/premium", external: false },
      { name: "Login", href: "/auth/signin", external: false },
    ],
    support: [
      { name: "QuickStart", href: "/docs/quickstart", external: false },
      {
        name: "Updating your profile",
        href: "/docs/how-to-guides/editing",
        external: false,
      },
      { name: "Json Playground", href: "/playground", external: false },
      {
        name: "Contributing Guide",
        href: "https://github.com/EddieHubCommunity/LinkFree/blob/main/CONTRIBUTING.md",
        external: true,
      },
      { name: "Road map", href: "/roadmap", external: false },
    ],
    community: [
      {
        name: "EddieHub GitHub Org",
        href: "https://github.com/EddieHubCommunity",
        external: true,
      },
      {
        name: "Maintainers",
        href: "/maintainers",
        external: false,
      },
      { name: "Resources", href: "/docs/community-resources", external: false },
      {
        name: "Contributors",
        href: "https://github.com/EddieHubCommunity/LinkFree/graphs/contributors",
        external: true,
      },
    ],
    legal: [
      {
        name: "License",
        href: "https://github.com/EddieHubCommunity/LinkFree/blob/main/LICENSE",
        external: true,
      },
      { name: "Terms", href: "/terms", external: false },
    ],
    social: [
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/linkfree.eddiehub/",
        external: true,
        icon: FaLinkedin,
      },
      {
        name: "GitHub",
        href: "https://github.com/EddieHubCommunity/LinkFree",
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
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <Image
            width={100}
            height={100}
            src="/logo512.png"
            alt="LinkFree logo"
          />
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
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col lg:flex-row items-center justify-between">
          <div className="flex-1 text-center lg:text-left pb-4 lg:pb-0">
            <h3 className="font-semibold leading-6 text-white">
              Subscribe to learn more about future Premium Paid Features
            </h3>
            <p className="mt-2 text-sm leading-6 text-primary-low-high">
              LinkFree will always be 100% Open Source and have a free tier.
            </p>
          </div>
          <Button
            text="Learn more about Premium"
            primary={true}
            icon={<FaDollarSign />}
            href="/premium"
          />
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 flex flex-col md:flex-row   items-center justify-between">
          <div className="flex pb-4 md:pb-0 items-center justify-center space-x-6 md:order-2">
            <p className=" text-xs leading-5 text-primary-low-high  md:mt-0">
              100% Open Source on GitHub
            </p>
            {navigation.social.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-primary-low-high hover:text-primary-low"
                target={item.external ? "_blank" : "_self"}
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </Link>
            ))}
          </div>
          <Link
            href="https://github.com/EddieHubCommunity/LinkFree"
            className=" text-primary-low-high hover:text-primary-low flex justify-center space-x-6 md:order-1 gap-2"
          >
            <FaRocket className="h-6 w-6" aria-hidden="true" />
            Powered by EddieHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
