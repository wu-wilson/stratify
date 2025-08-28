export type TaskEntity = {
  id: string;
  status_id: string;
  created_by: string;
  assigned_to: string | null;
  title: string;
  description: string | null;
  position: number;
  created_on: string;
};
