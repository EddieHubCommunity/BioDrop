import { useRouter } from "next/router";
import Tabs from "@components/Tabs";
import { usePathname } from "next/navigation";

export default function SubNav({ tabs }) {
  const router = useRouter();
  const pathname = usePathname();
  const selectedTab = tabs.find((tab) => pathname === tab.href) || tabs[0];

  const changeTab = (tab) => {
    router.push(tab.href, undefined, {
      scroll: false,
      shallow: true,
    });
  };

  return <Tabs tabs={tabs} setTabs={changeTab} selectedTab={selectedTab} />;
}
