import Link from "../Link";
import ReactMarkdown from "react-markdown";
import { abbreviateNumber } from "../../services/utils/abbreviateNumbers";
import FallbackImage from "../FallbackImage";

export default function UserCard({ profile }) {
  return (
    <Link
      href={`/${profile.username}`}
      className="flex flex-col items-center border-2 w-[14rem] h-[17rem] overflow-hidden rounded-lg border-gray-200 p-4 gap-3 hover:border-orange-600"
    >
      <div className="flex justify-center relative">
        <FallbackImage
          src={profile.avatar}
          alt={`Profile picture of ${profile.name}`}
          width={80}
          height={80}
          className="rounded-full"
          fallback={profile.name}
        />
        {profile.views && (
          <div className="absolute inline-block top-0 right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-1 px-1.5 text-xs leading-none text-center whitespace-nowrap align-baseline font-bold bg-orange-600 text-black rounded-full z-10">
            {abbreviateNumber(profile.views)}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xl justify-center text-center text-orange-600 font-bold mb-2">
          {profile.name}
        </h3>
        <ReactMarkdown className="text-center line-clamp-5">{profile.bio}</ReactMarkdown>
      </div>
    </Link>
  );
}
