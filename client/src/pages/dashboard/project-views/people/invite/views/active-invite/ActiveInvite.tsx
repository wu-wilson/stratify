import { type InviteEntity } from "../../../../../../../services/invites/types";
import styles from "./ActiveInvite.module.scss";

const ActiveInvite = ({
  invite,
  setInvite,
}: {
  invite: InviteEntity;
  setInvite: (invite: InviteEntity | null) => void;
}) => {
  return <div>Active Invite Link Found: {invite.token}</div>;
};

export default ActiveInvite;
