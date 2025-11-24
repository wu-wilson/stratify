import { type TagEntity } from "../../../../services/tags/types";

export type ModalOptions =
  | {
      type: "createTag";
    }
  | {
      type: "deleteTag";
      tag: TagEntity;
    }
  | {
      type: "editTag";
      tag: TagEntity;
    };
