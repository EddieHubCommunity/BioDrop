import UserProfile from "./UserProfile";
import Inline from "./themes/Inline";
import { Tabs } from "./themes/Tabs";

export default function UserPage({ data, BASE_URL }) {
  return (
    <>
      <UserProfile data={data} BASE_URL={BASE_URL} />

      {(!data.theme || data.theme === "original") && (
        <Tabs data={data} BASE_URL={BASE_URL} />
      )}
      {data.theme === "inline" && <Inline data={data} BASE_URL={BASE_URL} />}
    </>
  );
}
