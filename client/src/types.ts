import { Control } from "react-hook-form";

export type TFormData = {
  password: string;
  content: string;
  time: string;
  files: File[];
  isCode: boolean;
};

export type TFormProps = {
  control: Control<TFormData>;
  label: string;
  value: string;
};

export type TErrorMessage = {
  field?: string;
  message: string;
};