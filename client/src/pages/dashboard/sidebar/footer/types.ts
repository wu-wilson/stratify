import type { IconType } from "react-icons";

export type SidebarFooterItem = {
  icon: IconType;
  label: string;
  onClick: () => void;
};
