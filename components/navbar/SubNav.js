import { useRouter } from "next/router";
import Tabs from "@components/Tabs";

export default function SubNav({ tabs }) {
  const router = useRouter();

  const selectedTab = tabs.find((tab) => tab.current) || tabs[0];

  const changeTab = (tab) => {
    router.push(tab.href, undefined, {
      scroll: false,
    });
  };

  return <Tabs tabs={tabs} setTabs={changeTab} selectedTab={selectedTab} />;
}
