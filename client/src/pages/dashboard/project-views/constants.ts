import { RiDashboardHorizontalFill, RiUserSharedFill } from "react-icons/ri";
import { IoMdPricetags } from "react-icons/io";
import { type Tab } from "../../../components/tabs/types";

export const tabs: Tab[] = [
  { label: "Board", icon: RiDashboardHorizontalFill },
  { label: "Tags", icon: IoMdPricetags },
  { label: "People", icon: RiUserSharedFill },
];
