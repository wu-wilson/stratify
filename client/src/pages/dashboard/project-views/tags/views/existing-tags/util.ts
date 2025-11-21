import { IoTrashSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { type Dispatch, type SetStateAction } from "react";
import { type TagEntity } from "../../../../../../services/tags/types";
import {
  type ActionIcons,
  type Row,
} from "../../../../../../components/table/types";

export const getActionIcons = (
  setModal: Dispatch<SetStateAction<"remove" | "edit" | "create" | null>>,
  setSelectedTag: Dispatch<SetStateAction<TagEntity | null>>,
  isOwner: boolean
): ActionIcons[] => {
  return [
    {
      icon: FaEdit,
      onClick: (row: Row) => {
        setSelectedTag(row as TagEntity);
        setModal("edit");
      },
    },
    {
      icon: IoTrashSharp,
      onClick: (row: Row) => {
        setSelectedTag(row as TagEntity);
        setModal("remove");
      },
      render: () => isOwner,
    },
  ];
};
