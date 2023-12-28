import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HouseboatOutlinedIcon from "@mui/icons-material/HouseboatOutlined";
import FestivalOutlinedIcon from "@mui/icons-material/FestivalOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";

const MENU_ITEMS = [
  {
    title: "Dashboard",
    icon: DashboardOutlinedIcon,
    href: "/dashboard",
  },
  {
    title: "Users",
    icon: PersonOutlineOutlinedIcon,
    href: "/dashboard/users",
  },
  {
    title: "Attractions",
    icon: HouseboatOutlinedIcon,
    href: "/dashboard/attractions",
  },
  {
    title: "Festivals",
    icon: FestivalOutlinedIcon,
    href: "/dashboard/festivals",
  },
  {
    title: "Accommodations",
    icon: BedOutlinedIcon,
    href: "/dashboard/accommodations",
  },
];

export default MENU_ITEMS;
