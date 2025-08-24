import { RiFileSearchLine, RiTaskLine, RiUserSharedFill } from "react-icons/ri";
import { type Tab } from "../../../components/tabs/types";

export const tabs: Tab[] = [
  { label: "Overview", icon: RiFileSearchLine },
  { label: "Tasks", icon: RiTaskLine },
  { label: "People", icon: RiUserSharedFill },
];
