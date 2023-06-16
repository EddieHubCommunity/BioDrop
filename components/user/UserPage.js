import UserProfile from "./UserProfile";
import Inline from "./themes/Inline";
import { Tabs } from "./themes/Tabs";

export default function UserPage({ data, BASE_URL }) {
  return (
    <>
      <UserProfile data={data} BASE_URL={BASE_URL} />

      {(!data.layout || data.layout === "classic") && (
        <Tabs data={data} BASE_URL={BASE_URL} />
      )}
      {data.layout === "inline" && <Inline data={data} BASE_URL={BASE_URL} />}
    </>
  );
}
