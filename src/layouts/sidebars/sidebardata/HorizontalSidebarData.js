import * as Icon from 'react-feather';

const SidebarData = [
  { caption: 'Home' },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Icon.Home />,
    id: 1,
    suffix: "New",
    suffixColor: "bg-success",
    collapisble: false,
  },
  { caption: 'Administration' },
  {
    title: "User",
    href: "/user",
    icon: <Icon.User />,
    id: 2,
    collapisble: false,
  },
  {
    title: "Permission",
    href: "/permission",
    icon: <Icon.CheckSquare />,
    id: 3,
    collapisble: false,
  },
  {
    title: "Units",
    href: "/units",
    icon: <Icon.Globe />,
    id: 4,
    collapisble: false,
  },
  {
    title: "Institutions",
    href: "/institution",
    icon: <Icon.Grid />,
    id: 5,
    collapisble: false,
  }
];

export default SidebarData;
