import FallbackImage from "@components/FallbackImage";
import TagSimple from "@components/tag/TagSimple";
import { searchTagNameInInput } from "@services/utils/search/tags";
import Markdown from "@components/Markdown";
import Card from "@components/Card";

export default function UserHorizontal({ profile, input }) {
  return (
    <Card href={`/${profile.username}`}>
      <div className="flex w-full items-center justify-between space-x-2 p-2">
        <FallbackImage
          src={`https://github.com/${profile.username}.png`}
          alt={`Profile picture of ${profile.name}`}
          width={60}
          height={60}
          className="rounded-full"
          fallback={profile.name}
        />
        <div className="flex-1 wrap">
          <div className="flex items-center space-x-3">
            <h3 className="text-xl font-medium text-gray-900">
              {profile.username}
            </h3>
          </div>
          <Markdown
            disallowedElements={["a"]}
            unwrapDisallowed
            className="text-left line-clamp-3"
          >
            {profile.bio}
          </Markdown>
        </div>
      </div>
      {profile.tags?.length > 0 && (
        <div className="flex flex-wrap justify-center max-h-60 overflow-hidden">
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
                  isSelected={input && searchTagNameInInput(input, trimmedTag)}
                />
              );
            })}
        </div>
      )}
    </Card>
  );
}
