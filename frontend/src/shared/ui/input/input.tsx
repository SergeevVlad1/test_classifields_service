import type { InputProps } from "./input.types";

export const Input = ({
  className,
  value,
  key,
  onChange,
  name,
  label,
  type,
  placeholder,
}: InputProps) => {
  return (
    <label>
      {label}
      <input
        type={type}
        key={key}
        value={value || ""}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        className={className}
      />
    </label>
  );
};
