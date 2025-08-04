import { type InviteInvalidationReason } from "./types";

export const INVALID_INVITE_CONTENT_MAP: Record<
  InviteInvalidationReason,
  { title: string; subtext: string }
> = {
  already_joined: {
    title: "Already Joined",
    subtext:
      "You've already joined this project. If you are trying to join again, there's no need—you're all set.",
  },
  joins_disabled: {
    title: "Joins Disabled",
    subtext:
      "This invite link is currently disabled. If this is a mistake, contact a project owner to enable joins.",
  },
  max_uses_exceeded: {
    title: "Max Uses Exceeded",
    subtext:
      "This invite has reached its usage limit. If this is a mistake, contact a project owner to generate a new invite.",
  },
};
