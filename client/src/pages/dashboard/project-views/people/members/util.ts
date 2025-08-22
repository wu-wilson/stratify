import { IoSettingsSharp, IoTrashSharp } from "react-icons/io5";
import { type Dispatch, type SetStateAction } from "react";
import { type MemberEntity } from "../../../../../services/members/types";
import {
  type ActionIcons,
  type Row,
} from "../../../../../components/table/types";

export const getActionIcons = (
  setModal: Dispatch<SetStateAction<"remove" | "owner" | null>>,
  setSelectedMember: Dispatch<SetStateAction<MemberEntity | null>>,
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
