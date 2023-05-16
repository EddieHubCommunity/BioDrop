import ReactMarkdown from "react-markdown";

import Link from "@components/Link";
import FallbackImage from "@components/FallbackImage";

export default function UserCard({ profile }) {
  return (
    <Link
      href={`/${profile.username}`}
      className="flex flex-col items-center dark:border-white/10 border-2 w-[14rem] h-[17rem] overflow-hidden rounded-lg shadow-lg transition duration-350 p-4 gap-3 hover:scale-105 duration-500 ease-in-out hover:border-tertiary-medium"
    >
      <div className="flex justify-center relative">
        <FallbackImage
          src={`https://github.com/${profile.username}.png`}
          alt={`Profile picture of ${profile.name}`}
          width={80}
          height={80}
          className="rounded-full"
          fallback={profile.name}
        />
      </div>
      <div>
        <h3 className="text-xl justify-center text-center mb-2 text-tertiary-medium font-bold">
          {profile.name}
        </h3>
        <ReactMarkdown className="text-center line-clamp-5">
          {profile.bio}
        </ReactMarkdown>
      </div>
    </Link>
  );
}
