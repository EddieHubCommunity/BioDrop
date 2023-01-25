import UserLink from "./UserLink";
import Alert from "../Alert";

export default function UserLinks({ BASE_URL, data }) {
  const defaultBucket = "Others";
  data.links = data.links.map((link, i) => ({ id: i, ...link }));
  const buckets = data.links.reduce((acc, obj) => {
    const group = obj.group || defaultBucket;
    const curGroup = acc[group] ?? [];

    return { ...acc, [group]: [...curGroup, obj] };
  }, {});

  return (
    <>
      {!data.links && <Alert type="info" message="No links found" />}
      {data.links && (
        <div className="flex flex-col items-center w-full">
          {data.links &&
            Object.keys(buckets).map((name) => (
              <>
                {Object.keys(buckets).length !== 1 && (
                  <div
                    className="border-b border-gray-200 pb-3 w-full mt-6 mb-3"
                    key={name}
                  >
                    <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
                      <h3 className="ml-2 mt-2 text-lg font-medium leading-6 text-gray-900">
                        {name}
                      </h3>
                      <p className="ml-2 mt-1 truncate text-sm text-gray-500">
                        ({buckets[name].length})
                      </p>
                    </div>
                  </div>
                )}
                {Object.values(buckets[name]).map((link) => (
                  <UserLink
                    BASE_URL={BASE_URL}
                    key={link.id}
                    link={link}
                    username={data.username}
                    displayStatsPublic={data.displayStatsPublic}
                  />
                ))}
              </>
            ))}
        </div>
      )}
    </>
  );
}
