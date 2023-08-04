import UserLink from "./UserLink";
import Alert from "@components/Alert";

export default function UserLinks({ BASE_URL, links, username }) {
  const defaultBucket = "Others";
  const buckets = links?.reduce((acc, obj) => {
    const group = obj.group || defaultBucket;
    const curGroup = acc[group] ?? [];

    return { ...acc, [group]: [...curGroup, obj] };
  }, {});

  return (
    <ul>
      {!links?.length && <Alert type="info" message="No Links found" />}
      {links?.length > 0 && (
        <>
          {Object.keys(buckets).map((name) => (
            <>
              {Object.keys(buckets).length > 1 && (
                <li
                  className="border-b border-primary-low pb-3 w-full mt-6 mb-3"
                  key={name}
                >
                  <div className="-ml-2 mt-2 flex flex-wrap items-baseline">
                    <h3 className="ml-2 mt-2 text-md font-medium leading-6 dark:text-primary-low text-primary-high">
                      {name}
                    </h3>
                    <p className="ml-2 mt-1 truncate text-sm dark:text-primary-low-high text-primary-medium">
                      ({buckets[name].length})
                    </p>
                  </div>
                </li>
              )}
              {Object.values(buckets[name]).map((link) => (
                <UserLink
                  BASE_URL={BASE_URL}
                  key={link._id}
                  link={link}
                  username={username}
                  isEnabled={link.isEnabled}
                />
              ))}
            </>
          ))}
        </>
      )}
    </ul>
  );
}
