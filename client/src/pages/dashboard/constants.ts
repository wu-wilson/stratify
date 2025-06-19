import {
  RiFileSearchLine,
  RiProgress2Line,
  RiUserSharedFill,
} from "react-icons/ri";
import { type Tab } from "../../components/tabs/types";

export const tabs: Tab[] = [
  { label: "Overview", icon: RiFileSearchLine },
  { label: "Statuses", icon: RiProgress2Line },
  { label: "People", icon: RiUserSharedFill },
];
