import type { InviteEntity } from "../../../../../../../services/invites/types";
import styles from "./ActiveInvite.module.scss";

const ActiveInvite = ({ invite }: { invite: InviteEntity }) => {
  return <div>Active Invite Link Found: {invite.token}</div>;
};

export default ActiveInvite;
