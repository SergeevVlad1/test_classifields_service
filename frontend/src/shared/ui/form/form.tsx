import type { FormProps } from "./form.type";

export const Form = ({ className, children, onSubmit }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
};
