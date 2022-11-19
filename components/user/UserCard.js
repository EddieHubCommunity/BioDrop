import Link from "next/link";
import ReactMarkdown from "react-markdown";

import FallbackImage from "../FallbackImage";

export default function UserCard({ profile }) {
  return (
    <Link
      href={`/${profile.username}`}
      className="flex flex-col items-center border-2 max-w-[14rem] h-[17rem] overflow-hidden rounded-lg border-gray-200 p-4 gap-3 hover:border-orange-600"
    >
      <div className="flex justify-center">
        <FallbackImage
          src={profile.avatar}
          alt={`Profile picture of ${profile.name}`}
          width={80}
          height={80}
          className="rounded-full"
          fallback={profile.name}
        />
      </div>
      <div>
        <h3 className="text-xl justify-center text-center text-orange-600 font-bold mb-2">
          {profile.name}
        </h3>
        <ReactMarkdown className="text-center">{profile.bio}</ReactMarkdown>
      </div>
    </Link>
  );
}
