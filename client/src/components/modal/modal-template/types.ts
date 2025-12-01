import { type Dispatch, type SetStateAction } from "react";
import { type DropdownProps } from "../../dropdown/types";
import { type AutofillProps } from "../../autofill/types";

export type Template<D = never, A extends { id: string } = never> =
  | StringTemplate
  | NavigateBackTemplate
  | InputTemplate
  | ColorPickerTemplate
  | DropdownTemplate<D | null>
  | AutofillTemplate<A>
  | ButtonTemplate;

type StringTemplate = {
  type: "title" | "subtitle" | "highlight";
  value: string;
};

type NavigateBackTemplate = {
  type: "navigate-back";
  label: string;
  onClick: () => void;
};

type InputTemplate = {
  type: "input" | "textarea";
  label?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>> | ((v: string) => void);
  placeholder?: string;
  autoFocus?: boolean;
  criticalMsg: string | null;
};

type ColorPickerTemplate = {
  type: "color-picker";
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};

type DropdownTemplate<T> = DropdownProps<T> & {
  type: "dropdown";
  label: string;
};

type AutofillTemplate<T> = AutofillProps<T> & {
  type: "autofill";
  label: string;
  render?: boolean;
};

export type ButtonTemplate = {
  type: "button";
  label: string;
  onClick: () => void;
};
