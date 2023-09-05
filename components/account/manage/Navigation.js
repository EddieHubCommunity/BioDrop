import SubNav from "@components/navbar/SubNav";
import {
  MdPerson,
  MdOutlineAutoGraph,
  MdOutlineLink,
  MdSpeakerNotes,
  MdCalendarMonth,
  MdOutlineBadge,
  MdCode,
  MdSettings,
} from "react-icons/md";

const tabs = [
  {
    name: "Statistics",
    href: "/account/statistics",
    match: [],
    icon: MdOutlineAutoGraph,
    current: false,
  },
  {
    name: "Profile",
    href: "/account/manage/profile",
    match: [],
    icon: MdPerson,
    current: false,
  },
  {
    name: "Links",
    href: "/account/manage/links",
    match: [
      "/account/manage/link/[[...data]]",
      "/account/statistics/link/[[...data]]",
    ],
    icon: MdOutlineLink,
    current: false,
  },
  {
    name: "Milestones",
    href: "/account/manage/milestones",
    match: ["/account/manage/milestone/[[...data]]"],
    icon: MdOutlineBadge,
    current: false,
  },
  {
    name: "Events",
    href: "/account/manage/events",
    match: ["/account/manage/event/[[...data]]"],
    icon: MdCalendarMonth,
    current: false,
  },
  {
    name: "Testimonials",
    href: "/account/manage/testimonials",
    match: [],
    icon: MdSpeakerNotes,
    current: false,
  },
  {
    name: "Repos",
    href: "/account/manage/repos",
    match: ["/account/manage/repo/[[...data]]"],
    icon: MdCode,
    current: false,
  },
  {
    name: "Premium",
    href: "/account/manage/premium",
    match: [],
    icon: MdSettings,
    current: false,
  },
];

export default function Navigation() {
  return <SubNav tabs={tabs} />;
}
