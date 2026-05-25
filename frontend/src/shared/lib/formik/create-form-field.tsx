import React from "react";
import { useField } from "formik";

export interface BaseFieldProps {
  name: string;
  type?: string;
  value?: any;
}

export const createFormField = <T extends BaseFieldProps>(
  Component: React.ComponentType<any>
) => {
  return ({ name, type, value, ...props }: T & Record<string, any>) => {
    const [field, meta] = useField({ name, type, value });

    const additionalProps: Record<string, any> = {};
    if (type === "checkbox") {
      additionalProps.checked = !!field.value;
    } else if (type === "radio") {
      additionalProps.checked = field.value === value;
    }

    return (
      <div className={`form-field-container ${meta.error && meta.touched ? "has-error" : ""}`}>
        <Component 
          {...field} 
          {...props} 
          {...additionalProps} 
          type={type} 
          value={value} 
        />
        {meta.error && meta.touched && (
          <div className="error-message-bubble">
            {meta.error}
          </div>
        )}
      </div>
    );
  };
};
