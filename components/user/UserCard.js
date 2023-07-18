import ReactMarkdown from "react-markdown";

import Link from "@components/Link";
import FallbackImage from "@components/FallbackImage";
import TagSimple from "@components/TagSimple";

export default function UserCard({ profile }) {
  return (
    <Link
      href={`/${profile.username}`}
      className="flex flex-col items-center border-2 w-[14rem] h-[17rem] overflow-hidden rounded-lg shadow-lg transition duration-350 p-4 gap-3 hover:scale-105 duration-500 ease-in-out hover:border-tertiary-medium"
    >
      <div className="flex justify-center relative">
        <FallbackImage
          src={`https://github.com/${profile.username}.png`}
          alt={`Profile picture of ${profile.name}`}
          width={75}
          height={75}
          className="rounded-full"
          fallback={profile.name}
        />
      </div>
      <div>
        <h3 className="text-lg justify-center text-center mb-2 text-tertiary-medium font-bold">
          {profile.name}
        </h3>
        {/* Links inside a link is not allowed, remove them from bio in card */}
        <div className="flex flex-wrap justify-center mb-px">
        {profile.tags?.length > 0 &&
            profile.tags.map((tag, index) => {
              const trimmedTag = tag.trim();
              if (!trimmedTag) {
                return null;
              }
              return (
                <TagSimple
                  name={trimmedTag}
                  key={index}
                />
              );
            })}
            </div>
        <ReactMarkdown
          disallowedElements={["a"]}
          unwrapDisallowed
          className="text-center text-sm line-clamp-3"
        >
          {profile.bio}
        </ReactMarkdown>
      </div>
    </Link>
  );
}
