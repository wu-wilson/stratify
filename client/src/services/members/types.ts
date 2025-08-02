export type Role = "owner" | "member";

export type MemberEntity = {
  id: string;
  name: string;
  role: Role;
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
    role: Role;
    joined_on: string;
  };
};

export type UpdateRolePayload = {
  member_id: string;
  project_id: string;
  role: Role;
};

export type UpdateRoleResponse = {
  message: string;
  updated: {
    id: string;
    project_id: string;
    role: Role;
    joined_on: string;
  };
};
