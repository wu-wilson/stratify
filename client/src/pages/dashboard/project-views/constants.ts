import {
  RiFileSearchLine,
  RiDashboardHorizontalFill,
  RiUserSharedFill,
} from "react-icons/ri";
import { type Tab } from "../../../components/tabs/types";

export const tabs: Tab[] = [
  { label: "Overview", icon: RiFileSearchLine },
  { label: "Board", icon: RiDashboardHorizontalFill },
  { label: "People", icon: RiUserSharedFill },
];
