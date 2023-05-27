import { FiChevronRight } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";

import Link from "@components/Link";

export default function BreadCrumb({ page }) {
  return (
    <nav className="flex p-3" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link
              href="/docs"
              className="text-primary hover:text-primary-medium-low"
            >
              <AiOutlineHome
                className="h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="sr-only">Docs</span>
            </Link>
          </div>
        </li>
        <li key={page.section}>
          <div className="flex items-center">
            <FiChevronRight
              className="h-5 w-5 flex-shrink-0 text-primary"
              aria-hidden="true"
            />
            <Link
              href={"/docs/#" + page.section}
              className="ml-4 text-sm font-medium text-primary hover:text-primary-medium-low"
            >
              {page.section}
            </Link>
          </div>
        </li>
        <li key={page.name}>
          <div className="flex items-center">
            <FiChevronRight
              className="h-5 w-5 flex-shrink-0 text-primary"
              aria-hidden="true"
            />
            <Link
              href="#"
              className="ml-4 text-sm font-medium text-primary hover:text-primary-medium-low"
            >
              {page.name}
            </Link>
          </div>
        </li>
      </ol>
    </nav>
  );
}
