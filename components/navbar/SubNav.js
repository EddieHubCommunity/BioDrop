import Router, { useRouter } from "next/router";
import Tabs from "@components/Tabs";

export default function SubNav({ tabs }) {
  const router = useRouter();
  tabs = tabs.map((tab) => {
    if (router.pathname === tab.href || tab.match.includes(router.pathname)) {
      return { ...tab, current: true };
    }
    return { ...tab, current: false };
  });

  const changeTab = (e) => {
    const currentTab = tabs.find((tab) => tab.name === e.target?.value);
    if (currentTab?.href) {
      Router.push(currentTab.href);
    }
  };

  return <Tabs tabs={tabs} setTabs={changeTab} />;
}
