export interface CheckboxProps {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  label?: string;
  className?: string;
}

export interface InputProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  label: string;
  type: "text" | "number" | "email" | "password" | "tel";
  className?: string;
  placeholder?: string;
  key?: string;
}

export interface RadioProps {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  value: string;
  label?: string;
  className?: string;
}
