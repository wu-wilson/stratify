const Sidebar = ({
  projectId,
  setProjectId,
}: {
  projectId: string | null;
  setProjectId: (id: string | null) => void;
}) => {
  return <div>Project Selected: {projectId}</div>;
};

export default Sidebar;
