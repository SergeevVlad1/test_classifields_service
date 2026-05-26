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
import { usePropertyMutation } from "./api/use-property-mutation";
import styles from "./property-form.module.scss";
import axios from "axios";

export const PropertyForm = () => {
  const { mutate, isPending, isError, isSuccess, error } = usePropertyMutation();

  const handleSubmit = (
    values: PropertyFormValues,
    { resetForm }: FormikHelpers<PropertyFormValues>,
  ) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  const getErrorMessage = () => {
    if (!error) return "";
    
    // Check if it is an Axios error with response data (like DRF's 400 Bad Request)
    if (axios.isAxiosError(error) && error.response?.data) {
      const data = error.response.data;
      if (typeof data === "object" && data !== null) {
        return Object.entries(data)
          .map(([key, value]) => {
            const message = Array.isArray(value) ? value.join(", ") : String(value);
            // Translate common backend keys to Russian for better UX
            const fieldLabel = key === "url" ? "Ссылка" : key;
            return `${fieldLabel}: ${message}`;
          })
          .join(" | ");
      }
      if (typeof data === "string") return data;
    }
    
    // Fallback to connection errors
    return "Не удалось отправить объявление. Проверьте подключение к серверу.";
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, isValid, dirty }) => (
        <Form onSubmit={handleSubmit} className={styles.propertyRealForm}>
          <div className={styles.formFieldsWrapper}>
            {PROPERTY_FORM_FIELDS.map((row, rowIndex) => {
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
                    <div key={`row-${rowIndex}`} className={styles.formFieldsRow}>
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

          {isSuccess && (
            <div className={styles.formSuccessBanner}>
              🎉 Объявление отправлено! Задание по сканированию Авито добавлено в очередь.
            </div>
          )}

          {isError && (
            <div className={styles.formErrorBanner}>
              ❌ {getErrorMessage()}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={!isValid || !dirty || isPending}
          >
            {isPending ? "Отправка..." : "Опубликовать объявление"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
