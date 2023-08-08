import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import FallbackImage from "@components/FallbackImage";
import Tag from "@components/tag/Tag";

import UserQrModal from "./UserQrModal";
import UserSocial from "./UserSocials";
import ClipboardCopy from "@components/ClipboardCopy";

const LinkRenderer = ({ href, children }) => (
  <Link className="underline text-blue-900" target="_blank" href={href}>
    {children}
  </Link>
);

const UserBio = ({ user, BASE_URL }) => {
  const [qrShow, setQrShow] = useState(false);
  const router = useRouter();

  const formaTag = (tag, index) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) {
      return null;
    }
    return (
      <Tag
        name={trimmedTag}
        key={index}
        onClick={() =>
          router.push(`/search?keyword=${trimmedTag.toLowerCase()}`)
        }
      />
    );
  };

  return (
    <header className="relative isolate">
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
          <div
            className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
            style={{
              clipPath:
                "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
            }}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-8 lg:mx-0 lg:max-w-none flex-wrap">
          <div className="flex items-center gap-x-6 ">
            <FallbackImage
              height={120}
              width={120}
              src={`https://github.com/${user.username}.png`}
              alt={`Profile picture of ${user.name}`}
              fallback={user.name}
              priority
              className="rounded-full object-contain"
            />
            <div>
              <h1 className="text-xl leading-6 text-gray-900 font-bold">
                {user.name}
              </h1>
              <div className="mt-1 text-base font-semibold leading-6 text-gray-900">
                <ReactMarkdown components={{ a: LinkRenderer }}>
                  {user.bio}
                </ReactMarkdown>{" "}
              </div>
              <div className="flex self-center gap-3 mt-2">
                {user.socials?.map((social) => (
                  <UserSocial
                    social={social}
                    key={social._id}
                    BASE_URL={BASE_URL}
                    username={user.username}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-4 sm:gap-x-6">
            <div className="flex items-center justify-center">
              <ClipboardCopy
                isButton
              >{`${BASE_URL}/${user.username}`}</ClipboardCopy>
            </div>
            <button
              onClick={() => setQrShow(true)}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 block"
            >
              Save QR
            </button>
          </div>
        </div>
        <div className="flex flex-wrap mt-2">
          {user.tags?.length > 0 && user.tags.map(formaTag)}
        </div>
      </div>
      <UserQrModal
        show={qrShow}
        setShow={setQrShow}
        url={{
          BASE_URL,
          userName: user.userName,
        }}
      />
    </header>
  );
};

export default UserBio;
