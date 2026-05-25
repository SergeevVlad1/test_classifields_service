export interface FormProps {
  children: React.ReactNode;
  className?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}