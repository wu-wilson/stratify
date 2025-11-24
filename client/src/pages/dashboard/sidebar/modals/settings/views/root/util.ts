import { getTruncatedText } from "../../../../../../../util";
import { DISPLAY_NAME } from "../name/constants";

export const getTruncatedDisplayName = (displayName: string | null): string => {
  const name = displayName ?? DISPLAY_NAME;
  return getTruncatedText(name, 17);
};
