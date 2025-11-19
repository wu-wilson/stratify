import { type TagEntity } from "../../../../../../services/tags/types";

const EditTag = ({
  tag,
  closeModal,
}: {
  tag: TagEntity;
  closeModal: () => void;
}) => {
  return <div>Edit Tag: {tag.name}</div>;
};

export default EditTag;
