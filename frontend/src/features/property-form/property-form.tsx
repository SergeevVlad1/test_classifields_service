import { Formik } from "formik";
import Yup from "../../shared/lib/yup/yup-init";
import { Form } from "../../shared/ui/form/form";
import { Input } from "../../shared/ui/input/input";
import { Checkbox } from "../../shared/ui/input/checkbox";
import { Radio } from "../../shared/ui/input/radio";
import { createFormField } from "../../shared/lib/formik/create-form-field";
import type { PropertyFormValues } from "./property-form.type";

const FormikInput = createFormField(Input);
const FormikCheckbox = createFormField(Checkbox);
const FormikRadio = createFormField(Radio);

const initialValues: PropertyFormValues = {
  name: "",
  address: "",
  floor: "",
  totalFloors: "",
  square: "",
  livingSquare: "",
  kitchenSquare: "",
  propertyType: "apartment",
  agree: false,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  address: Yup.string().required(),
  totalFloors: Yup.number().required().integer().min(-3).max(200),
  floor: Yup.number()
    .required()
    .integer()
    .min(-1)
    .max(
      Yup.ref("totalFloors"),
      "Значение не может быть больше количества этажей в доме",
    ),
  square: Yup.number()
    .required()
    .integer()
    .min(0)
    .max(400)
    .moreThanSumOfFields(
      ["livingSquare", "kitchenSquare"],
      "Общая площадь должна быть больше суммы жилой площади и площади кухни",
    ),
  livingSquare: Yup.number().required().integer().min(0),
  kitchenSquare: Yup.number().required().integer().min(0),
  propertyType: Yup.string().required(),
  agree: Yup.boolean()
    .oneOf([true], "Поле обязательно для заполнения")
    .required(),
});

export const PropertyForm = () => {
  const handleSubmit = (values: PropertyFormValues, { resetForm }: any) => {
    alert(`Форма успешно отправлена!\n\n${JSON.stringify(values, null, 2)}`);
    resetForm();
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Добавить Объявление</h2>
        <p>Заполните параметры объекта недвижимости</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, isValid, dirty }) => (
          <Form onSubmit={handleSubmit} className="property-real-form">
            <FormikInput
              name="name"
              label="Название объекта"
              type="text"
              placeholder="Например: Уютная студия в центре"
            />

            <FormikInput
              name="address"
              label="Адрес"
              type="text"
              placeholder="Улица, дом, квартира"
            />

            <div className="form-row-2">
              <FormikInput
                name="totalFloors"
                label="Всего этажей"
                type="number"
                placeholder="20"
              />
              <FormikInput
                name="floor"
                label="Этаж"
                type="number"
                placeholder="5"
              />
            </div>

            <div className="form-row-3">
              <FormikInput
                name="square"
                label="Общая площадь (м²)"
                type="number"
                placeholder="60"
              />
              <FormikInput
                name="livingSquare"
                label="Жилая площадь (м²)"
                type="number"
                placeholder="30"
              />
              <FormikInput
                name="kitchenSquare"
                label="Площадь кухни (м²)"
                type="number"
                placeholder="15"
              />
            </div>

            <div className="radio-group-container">
              <span className="group-title">Тип недвижимости</span>
              <div className="radio-options">
                <FormikRadio
                  name="propertyType"
                  type="radio"
                  value="apartment"
                  label="Квартира"
                />
                <FormikRadio
                  name="propertyType"
                  type="radio"
                  value="house"
                  label="Дом / Коттедж"
                />
                <FormikRadio
                  name="propertyType"
                  type="radio"
                  value="commercial"
                  label="Коммерческая"
                />
              </div>
            </div>

            <FormikCheckbox
              name="agree"
              type="checkbox"
              label="Я соглашаюсь с правилами размещения объявлений"
            />

            <button
              type="submit"
              className="submit-button"
              disabled={!(isValid && dirty)}
            >
              Опубликовать объект
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
