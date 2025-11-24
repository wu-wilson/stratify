import { IoSettingsSharp, IoTrashSharp } from "react-icons/io5";
import { type Dispatch, type SetStateAction } from "react";
import { type MemberEntity } from "../../../../../../services/members/types";
import { type ModalOptions } from "../../types";
import {
  type ActionIcons,
  type Row,
} from "../../../../../../components/table/types";

export const getActionIcons = (
  setModal: Dispatch<SetStateAction<ModalOptions | null>>,
  userIsOwner: boolean
): ActionIcons[] => {
  return [
    {
      icon: IoSettingsSharp,
      onClick: (row: Row) => {
        setModal({ type: "makeOwner", member: row as MemberEntity });
      },
      render: (row: Row) =>
        (row as MemberEntity).role !== "owner" && userIsOwner,
    },
    {
      icon: IoTrashSharp,
      onClick: (row: Row) => {
        setModal({ type: "removeMember", member: row as MemberEntity });
      },
      render: (row: Row) =>
        (row as MemberEntity).role !== "owner" && userIsOwner,
    },
  ];
};
