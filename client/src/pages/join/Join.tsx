import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { getInviteMetadata } from "../../services/invites/invites.service";
import { isInviteInvalid } from "./util";
import { type GetInviteMetadataResponse } from "../../services/invites/types";
import Spinner from "../../components/spinner/Spinner";
import Error from "../../components/error/Error";
import InvalidInvite from "./views/invalid-invite/InvalidInvite";
import ValidInvite from "./views/valid-invite/ValidInvite";
import styles from "./Join.module.scss";

const Join = () => {
  const { user } = useAuth();
  const { token } = useParams();
  const [metadata, setMetadata] = useState<GetInviteMetadataResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetadata = async () => {
    try {
      const metadata = await getInviteMetadata(token!);
      setError(null);
      setMetadata(metadata);
    } catch (err) {
      setError("getInviteMetadata endpoint failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      fetchMetadata();
    }
  }, [loading]);

  const invalidationReason = useMemo(() => {
    if (!metadata || !user) return null;
    return isInviteInvalid(metadata, user);
  }, [metadata, user]);

  if (loading) {
    return (
      <div className={styles.container}>
        <Spinner size={50} text="Fetching metadata..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Error errorMsg={error} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {invalidationReason ? (
        <InvalidInvite invalidationReason={invalidationReason} />
      ) : (
        <ValidInvite inviteMetadata={metadata!} token={token!} />
      )}
    </div>
  );
};

export default Join;
