import { useRouter } from "next/router";
import { OutlineButton } from "./Button";

export default function EditOnGitHub() {
  const router = useRouter();
  const { asPath } = router;

  const githubUrl = `https://github.com/EddieHubCommunity/LinkFree/edit/main/pages${
    asPath === "/docs" ? `/docs/index.js` : `${asPath}.mdx`
  }`;

  return (
    <div className="mt-12 border border-primary-low-medium rounded-lg p-4">
      <a href={githubUrl} target="_blank" rel="noopener noreferrer">
        <OutlineButton chilrdren={"Edit page on GitHub"} />
      </a>
      <a
        href={githubUrl.replace("/edit/", "/blob/")}
        target="_blank"
        rel="noopener noreferrer">
        <OutlineButton chilrdren={"View page on GitHub"} />
      </a>
      <a
        href={"https://github.com/EddieHubCommunity/LinkFree/issues/new/choose"}
        target="_blank"
        rel="noopener noreferrer">
        <OutlineButton chilrdren={"Create an issue"} />
      </a>
    </div>
  );
}
