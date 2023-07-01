import UserProfile from "./UserProfile";
import UserInline from "./themes/UserInline";
import UserTabs from "./themes/UserTabs";

export default function UserPage({ data, BASE_URL, apiEvents }) {
  return (
    <>
      <UserProfile data={data} BASE_URL={BASE_URL} />

      {(!data.layout || data.layout === "classic") && (
        <UserTabs data={data} BASE_URL={BASE_URL} apiEvents={apiEvents} />
      )}
      {data.layout === "inline" && (
        <UserInline data={data} BASE_URL={BASE_URL} />
      )}
    </>
  );
}
