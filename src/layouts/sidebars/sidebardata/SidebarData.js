import * as Icon from "react-feather";

const SidebarData = [
  { caption: "Home", requiredRoles: [] },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Icon.Home />,
    id: 1,
    suffix: "New",
    suffixColor: "bg-success",
    collapisble: false,
  },
  { caption: "Administration", requiredRoles: [] },
  {
    title: "User",
    href: "/user",
    icon: <Icon.User />,
    id: 2,
    collapisble: false,
    requiredRoles: ["R100000"],
  },
  {
    title: "Permission",
    href: "/permission",
    icon: <Icon.CheckSquare />,
    id: 3,
    collapisble: false,
    requiredRoles: ["R100004"]
  },
  {
    title: "Units",
    href: "/units",
    icon: <Icon.Globe />,
    id: 4,
    collapisble: false,
    requiredRoles: ["R100008"]
  },
  {
    title: "Institutions",
    href: "/institution",
    icon: <Icon.Grid />,
    id: 5,
    collapisble: false,
    requiredRoles: ["R100012", "R100013"]
  },
  {
    title: "Events",
    href: "/events",
    icon: <Icon.Clipboard />,
    id: 6,
    collapisble: false,
  }
];

export default SidebarData;
