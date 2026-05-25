import type { RadioProps } from "./input.types";

export const Radio = ({
  checked,
  onChange,
  name,
  value,
  label,
  className,
}: RadioProps) => {
  return (
    <label className={className}>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        name={name}
        value={value}
        className="real-radio"
      />
      <span className="custom-radio"></span>
      {label && <span className="radio-text">{label}</span>}
    </label>
  );
};
