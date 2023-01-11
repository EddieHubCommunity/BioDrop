import { abbreviateNumber } from "js-abbreviation-number";
import Link from "next/link";
import FallbackImage from "../FallbackImage";
import ReactMarkdown from "react-markdown";

export default function UserCard({ profile }) {
  return (
    <Link
      href={`/${profile.username}`}
      className="p-4 flex items-center flex-col gap-3 w-[14rem] h-[17rem] border-2 border-solid border-gray-200 hover:border-orange-600 rounded-lg overflow-hidden"
    >
      <div className="relative flex items-center justify-center w-auto h-auto">
        <FallbackImage
          src={profile.avatar}
          width={80}
          height={80}
          className="rounded-full"
          alt={`Profile picture of ${profile.name}`}
          fallback={profile.name}
        />
        {profile.views && (
          <div className="absolute top-0 right-0 bottom-auto left-auto inline-block align-baseline py-1 px-1.5 bg-orange-600 text-xs text-center text-black font-bold leading-none translate-x-1/2 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full z-10">
            {abbreviateNumber(profile.views)}
          </div>
        )}
      </div>
      <div className="inline-block w-full h-auto">
        <h3 className="mb-2 text-xl text-center text-orange-600 font-bold">
          {profile.name}
        </h3>
        <ReactMarkdown className="text-center">{profile.bio}</ReactMarkdown>
      </div>
    </Link>
  );
}
