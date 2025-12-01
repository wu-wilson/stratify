import { type ButtonTemplate, type Template } from "../types";

export type RequestTemplate<
  D = never,
  A extends { id: string } = never
> = Exclude<Template<D, A>, ButtonTemplate>;

export type Button = {
  label: "Save" | "Create" | "Delete" | "Generate";
  disabled: boolean;
};
