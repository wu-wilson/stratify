export type View = "root" | "personal" | "time" | "appearance" | "name";

export type Props = {
  setView: (view: View) => void;
};
