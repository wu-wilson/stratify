import { TbFaceIdError } from "react-icons/tb";
import { BiError, BiInfoCircle } from "react-icons/bi";
import { type IconType } from "react-icons";
import { type SnackbarType } from "./types";

export const ICON_MAP: { [K in SnackbarType]: IconType } = {
  info: BiInfoCircle,
  error: TbFaceIdError,
  warning: BiError,
};
