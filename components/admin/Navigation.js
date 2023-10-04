import SubNav from "@components/navbar/SubNav";
import { MdPerson, MdOutlineAutoGraph, MdChangeHistory } from "react-icons/md";

const tabs = [
  {
    name: "Statistics",
    href: "/admin/statistics",
    match: [],
    icon: MdOutlineAutoGraph,
    current: false,
  },
  {
    name: "Events",
    href: "/admin/events",
    match: [],
    icon: MdPerson,
    current: false,
  },
  {
    name: "Profiles",
    href: "/admin/profiles",
    match: [],
    icon: MdPerson,
    current: false,
  },
  {
    name: "Changelog",
    href: "/admin/changelog",
    match: [],
    icon: MdChangeHistory,
    current: false,
  },
];

export default function Navigation() {
  return <SubNav tabs={tabs} />;
}
