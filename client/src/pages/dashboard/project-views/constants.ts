import { RiDashboardHorizontalFill, RiUserSharedFill } from "react-icons/ri";
import { IoMdPricetags } from "react-icons/io";
import { type Tab } from "../../../components/tabs/types";
import { normalize } from "./util";

export const tabs: Tab[] = [
  {
    label: "Board",
    key: normalize("Board"),
    icon: RiDashboardHorizontalFill,
  },
  { label: "Tags", key: normalize("Tags"), icon: IoMdPricetags },
  { label: "People", key: normalize("People"), icon: RiUserSharedFill },
];
