import { Formik, type FormikHelpers } from "formik";
import { Form } from "../../shared/ui/form/form";
import type { PropertyFormValues } from "./property-form.type";
import { validationSchema } from "./property-form.schema";
import { initialValues, PROPERTY_FORM_FIELDS } from "./property-form.constants";
import {
  FormikCheckbox,
  FormikInput,
  FormikRadio,
} from "../../shared/lib/formik/input-components";

export const PropertyForm = () => {
  const handleSubmit = (
    values: PropertyFormValues,
    { resetForm }: FormikHelpers<PropertyFormValues>,
  ) => {
    console.log(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, isValid, dirty }) => (
        <Form onSubmit={handleSubmit} className="property-real-form">
          <div>
            {PROPERTY_FORM_FIELDS.map((row, index) => {
              switch (row.type) {
                case "single":
                  return (
                    <FormikInput
                      key={row.field.name}
                      name={row.field.name}
                      label={row.field.label}
                      type={row.field.type}
                      placeholder={row.field.placeholder}
                    />
                  );
                case "row":
                  return (
                    <div>
                      {row.fields.map((f) => (
                        <FormikInput
                          key={f.name}
                          name={f.name}
                          label={f.label}
                          type={f.type}
                          placeholder={f.placeholder}
                        />
                      ))}
                    </div>
                  );
                case "radio-group":
                  return (
                    <div key={row.name} className="radio-group-container">
                      <span className="group-title">{row.label}</span>
                      <div className="radio-options">
                        {row.options.map((opt) => (
                          <FormikRadio
                            key={opt.value}
                            name={row.name}
                            type="radio"
                            value={opt.value}
                            label={opt.label}
                          />
                        ))}
                      </div>
                    </div>
                  );
                case "checkbox":
                  return (
                    <FormikCheckbox
                      key={row.name}
                      name={row.name}
                      type="checkbox"
                      label={row.label}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>
        </Form>
      )}
    </Formik>
  );
};
