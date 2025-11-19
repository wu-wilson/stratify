export type Role = "owner" | "member";

export type MemberEntity = {
  id: string;
  name: string;
  role: Role;
  joined_on: string;
};

export type DeleteMemberParams = {
  member_id: string;
  project_id: string;
  deleted_by: string;
};

export type DeleteMemberResponse = {
  message: string;
  deleted: {
    id: string;
    project_id: string;
    role: Role;
    joined_on: string;
  };
  deleted_on: string;
};

export type UpdateRolePayload = {
  member_id: string;
  project_id: string;
  role: Role;
  updated_by: string;
};

export type UpdateRoleResponse = {
  message: string;
  updated: {
    id: string;
    project_id: string;
    role: Role;
    joined_on: string;
  };
  updated_on: string;
};
