import { type Dispatch, type SetStateAction } from "react";

export type ModalContextType<T> = {
  modal: T | null;
  setModal: Dispatch<SetStateAction<T | null>>;
  closeModal: () => void;
};
