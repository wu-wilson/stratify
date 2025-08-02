import { IoSettingsSharp, IoTrashSharp } from "react-icons/io5";
import { type MemberEntity } from "../../../../../services/members/types";
import {
  type ActionIcons,
  type Row,
} from "../../../../../components/table/types";

export const getActionIcons = (
  setModal: (modal: "remove" | "owner" | null) => void,
  setSelectedMember: (member: MemberEntity | null) => void,
  isOwner: boolean
): ActionIcons[] => {
  if (!isOwner) return [];

  return [
    {
      icon: IoSettingsSharp,
      onClick: (row: Row) => {
        setSelectedMember(row as MemberEntity);
        setModal("owner");
      },
      render: (row: Row) => (row as MemberEntity).role !== "owner",
    },
    {
      icon: IoTrashSharp,
      onClick: (row: Row) => {
        setSelectedMember(row as MemberEntity);
        setModal("remove");
      },
      render: (row: Row) => (row as MemberEntity).role !== "owner",
    },
  ];
};
