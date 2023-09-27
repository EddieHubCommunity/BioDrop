import UserProfile from "./UserProfile";
import ProfileColumn2 from "./themes/ProfileColumn2";
import ProfileInline from "./themes/ProfileInline";
import ProfileTabs from "./themes/ProfileTabs";

import config from "@config/app.json";

export default function ProfilePage({ data, BASE_URL }) {
  return (
    <>
      <UserProfile data={data} BASE_URL={BASE_URL} />

      {(!data.layout ||
        !config.layouts.includes(data.layout) ||
        data.layout === "classic") && (
        <ProfileTabs data={data} BASE_URL={BASE_URL} />
      )}

      {data.layout === "inline" && (
        <ProfileInline data={data} BASE_URL={BASE_URL} />
      )}

      {data.layout === "column-2" && (
        <ProfileColumn2 data={data} BASE_URL={BASE_URL} />
      )}
    </>
  );
}
