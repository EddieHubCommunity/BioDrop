import UserProfile from "./UserProfile";
import UserColumn2 from "./themes/UserColumn2";
import UserInline from "./themes/UserInline";
import UserTabs from "./themes/UserTabs";

import config from "@config/app.json";

export default function UserPage({ data, BASE_URL }) {
  return (
    <>
      <UserProfile data={data} BASE_URL={BASE_URL} />

      {(!data.layout ||
        !config.layouts.includes(data.layout) ||
        data.layout === "classic") && (
        <UserTabs data={data} BASE_URL={BASE_URL} />
      )}

      {data.layout === "inline" && (
        <UserInline data={data} BASE_URL={BASE_URL} />
      )}

      {data.layout === "column-2" && (
        <UserColumn2 data={data} BASE_URL={BASE_URL} />
      )}
    </>
  );
}
