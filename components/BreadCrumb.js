import Link from '@components/Link'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

export default function BreadCrumb({pageData}) {

  return (
    <nav className="flex sticky top-2 bg-slate-900 dark:bg-slate-800 p-3 rounded z-[100]" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/docs" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Docs</span>
            </Link>
          </div>
        </li>
          <li key={pageData.section}>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <Link
                href={"/docs/#"+pageData.section}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {pageData.section}
              </Link>
            </div>
          </li>
          <li key={pageData.name}>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <Link
                href="#"
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {pageData.name}
              </Link>
            </div>
          </li>
      </ol>
    </nav>
  )
}