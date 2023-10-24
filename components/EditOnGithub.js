import { useRouter } from "next/router";
import { RiCodeSSlashFill, RiEdit2Fill, RiFeedbackLine } from "react-icons/ri";

const className =
  "hover:bg-primary-low group hover:text-secondary-high dark:hover:text-secondary-high flex w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-primary-high dark:text-primary-low-medium";

const iconClass = "h-5 w-5 self-center";

export default function EditOnGitHub() {
  const router = useRouter();
  const { asPath } = router;

  const githubUrl = `https://github.com/EddieHubCommunity/BioDrop/edit/main/pages${
    asPath === "/docs" || asPath === "/docs/open-source-roadmap"
      ? `${asPath}/index.js`
      : `${asPath}.mdx`
  }`;

  return (
    <li>
      <div className="text-md font-semibold text-primary-high dark:text-primary-low-medium mt-8 p-2">
        GitHub Links
      </div>
      <ul role="list" className="space-y-1">
        <li>
          <a
            href={githubUrl}
            className={className}
            target="_blank"
            rel="noreferrer noopener"
          >
            <RiEdit2Fill className={iconClass} />
            Edit page on GitHub
          </a>
        </li>
        <li>
          <a
            href={githubUrl.replace("/edit/", "/blob/")}
            className={className}
            target="_blank"
            rel="noreferrer noopener"
          >
            <RiCodeSSlashFill className={iconClass} />
            View page on GitHub
          </a>
        </li>
        <li>
          <a
            href={
              "https://github.com/EddieHubCommunity/BioDrop/issues/new/choose"
            }
            className={className}
            target="_blank"
            rel="noreferrer noopener"
          >
            <RiFeedbackLine className={iconClass} />
            Feedback or feature request
          </a>
        </li>
      </ul>
    </li>
  );
}
