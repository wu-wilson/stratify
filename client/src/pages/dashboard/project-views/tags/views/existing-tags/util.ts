import { IoTrashSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { type Dispatch, type SetStateAction } from "react";
import { type TagEntity } from "../../../../../../services/tags/types";
import { type ModalOptions } from "../../types";
import {
  type ActionIcons,
  type Row,
} from "../../../../../../components/table/types";

export const getActionIcons = (
  setModal: Dispatch<SetStateAction<ModalOptions | null>>,
  isOwner: boolean
): ActionIcons[] => {
  return [
    {
      icon: FaEdit,
      onClick: (row: Row) => {
        setModal({ type: "editTag", tag: row as TagEntity });
      },
    },
    {
      icon: IoTrashSharp,
      onClick: (row: Row) => {
        setModal({ type: "deleteTag", tag: row as TagEntity });
      },
      render: () => isOwner,
    },
  ];
};
