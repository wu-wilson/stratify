import { useEffect, useState } from "react";
import { getMembers } from "../../../../services/members/members.service";
import { type MemberEntity } from "../../../../services/members/types";
import Members from "./members/Members";
import styles from "./People.module.scss";

const People = ({ project }: { project: string }) => {
  const [members, setMembers] = useState<MemberEntity[] | null>(null);

  useEffect(() => {
    setMembers(null);
  }, [project]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersList = await getMembers(project);
        setMembers(membersList);
      } catch (error) {
        setMembers([]);
      }
    };

    if (members === null) {
      fetchMembers();
    }
  }, [members, project]);

  return (
    <div className={`${styles.container} ${styles.grid}`}>
      <Members
        members={members ?? []}
        setMembers={setMembers}
        loading={members === null}
        project={project}
      />
    </div>
  );
};

export default People;
