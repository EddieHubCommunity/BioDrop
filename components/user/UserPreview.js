import Link from "next/link";
import ReactMarkdown from "react-markdown";

import FallbackImage from "../FallbackImage";

export default function UserPreview({ profile }) {
  return (
    <Link
      href={`/${profile.username}`}
      className="flex flex-col gap-x-4 rounded md:rounded-full md:flex-row border-2 border-gray-200 hover:border-orange-600 p-4 my-2"
    >
      <div className="flex items-center gap-5">
        <div className="min-w-[5rem]">
          <FallbackImage
            src={profile.avatar}
            alt={`Profile picture of ${profile.name}`}
            width={80}
            height={80}
            className="rounded-full"
            fallback={profile.name}
          />
        </div>
        <h3 className="text-xl font-bold md:hidden">
          {profile.name} {profile.views && <span>({profile.views})</span>}
        </h3>
      </div>
      <div>
        <h3 className="hidden md:block text-2xl font-bold">{profile.name}</h3>
        <ReactMarkdown>{profile.bio}</ReactMarkdown>
      </div>
    </Link>
  );
}
