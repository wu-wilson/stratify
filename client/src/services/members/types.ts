export type MemberEntity = {
  id: string;
  name: string;
  role: "owner" | "member";
  joined_on: string;
};
