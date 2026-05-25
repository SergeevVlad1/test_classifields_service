import type { CheckboxProps } from "./input.types";

export const Checkbox = ({
  checked,
  onChange,
  name,
  label,
  className,
}: CheckboxProps) => {
  return (
    <label className={className}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
        className="real-checkbox"
      />
      <span className="custom-checkbox"></span>
      {label && <span className="checkbox-text">{label}</span>}
    </label>
  );
};
