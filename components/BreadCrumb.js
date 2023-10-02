import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";

import Link from "@components/Link";

export default function BreadCrumb({ section, name }) {
  return (
    <nav className="flex p-3" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link
              href="/docs"
              className="text-primary hover:text-tertiary-medium"
            >
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Docs</span>
            </Link>
          </div>
        </li>
        <li key={section}>
          <div className="flex items-center">
            <ChevronRightIcon
              className="h-5 w-5 flex-shrink-0 text-primary"
              aria-hidden="true"
            />
            <Link
              href={`/docs/#${section}`}
              className="ml-4 text-sm font-medium text-primary hover:text-tertiary-medium"
            >
              {section}
            </Link>
          </div>
        </li>
        <li key={name}>
          <div className="flex items-center">
            <ChevronRightIcon
              className="h-5 w-5 flex-shrink-0 text-primary"
              aria-hidden="true"
            />
            <Link
              href="#"
              className="ml-4 text-sm font-medium text-primary hover:text-tertiary-medium"
            >
              {name}
            </Link>
          </div>
        </li>
      </ol>
    </nav>
  );
}
