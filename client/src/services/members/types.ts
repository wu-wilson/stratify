export type MemberEntity = {
  id: string;
  name: string;
  role: "owner" | "member";
  joined_on: string;
};

export type DeleteMemberPayload = {
  member_id: string;
  project_id: string;
};

export type DeleteMemberResponse = {
  message: string;
  deleted: {
    id: string;
    project_id: string;
    role: "owner" | "member";
    joined_on: string;
  };
};

export type UpdateRolePayload = {
  member_id: string;
  project_id: string;
  role: "owner" | "member";
};

export type UpdateRoleResponse = {
  message: string;
  updated: {
    id: string;
    project_id: string;
    role: "owner" | "member";
    joined_on: string;
  };
};
