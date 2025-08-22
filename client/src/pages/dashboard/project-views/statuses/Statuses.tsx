import { useSnackbar } from "../../../../hooks/useSnackbar";
// import styles from "./Statuses.module.scss";

const Statuses = () => {
  const { pushMessage } = useSnackbar();

  return (
    <div>
      <button
        onClick={() =>
          pushMessage({ type: "error", message: "Testing Snackbar" })
        }
      >
        Click Me
      </button>
    </div>
  );
};

export default Statuses;
