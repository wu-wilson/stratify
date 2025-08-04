import { type User } from "firebase/auth";
import { type InviteInvalidationReason } from "./views/invalid-invite/types";
import { type GetInviteMetadataResponse } from "../../services/invites/types";

export const isInviteInvalid = (
  metadata: GetInviteMetadataResponse,
  user: User
): InviteInvalidationReason | null => {
  if (metadata.project.members.includes(user.uid)) {
    return "already_joined";
  }
  if (metadata.invite.paused) {
    return "joins_disabled";
  }
  if (metadata.invite.uses >= metadata.invite.max_uses) {
    return "max_uses_exceeded";
  }
  return null;
};
