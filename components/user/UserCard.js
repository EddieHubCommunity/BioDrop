import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { abbreviateNumber } from "js-abbreviation-number";

import FallbackImage from "../FallbackImage";

export default function UserCard({ profile }) {
  return (
    <Link
      href={`/${profile.username}`}
      className="flex flex-col items-center border-2 max-w-[14rem] h-[17rem] overflow-hidden rounded-lg border-gray-200 h p-4 my-2 gap-3 "
    >
      <div className="">
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
        <h3 className="text-lg  md:hidden text-center mt-2 text-[#ff5a00] font-bold">
          {profile.name}{" "}
          {profile.views && (
            <span className="text-green-500">
              ({abbreviateNumber(profile.views)})
            </span>
          )}
        </h3>
      </div>
      <div>
        <h3 className="hidden md:flex text-xl justify-center text-center text-[#ff5a00] mt-2 font-bold">
          {profile.name}
        </h3>
        <ReactMarkdown className="text-center text-[#65615e] mt-1">
          {profile.bio}
        </ReactMarkdown>
      </div>
    </Link>
  );
}
