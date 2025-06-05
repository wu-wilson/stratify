const Sidebar = ({
  projectId,
  setProjectId,
}: {
  projectId: number | null;
  setProjectId: (id: number | null) => void;
}) => {
  return <div>Project Selected: {projectId}</div>;
};

export default Sidebar;
