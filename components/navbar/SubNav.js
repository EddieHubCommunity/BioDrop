import { useRouter } from "next/router";
import Tabs from "@components/Tabs";

export default function SubNav({ tabs }) {
  const router = useRouter();
  const selectedTab = tabs.find((tab) => router.pathname === tab.href);

  const changeTab = (tab) => {
    router.push(tab.href, undefined, {
      scroll: false,
      shallow: true,
    });
  };

  return <Tabs tabs={tabs} setTabs={changeTab} selectedTab={selectedTab} />;
}
