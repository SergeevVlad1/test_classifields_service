import type { FormRowConfig, PropertyFormValues } from "./property-form.type";

export const initialValues: PropertyFormValues = {
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

export const PROPERTY_FORM_FIELDS: FormRowConfig[] = [
  {
    type: "single",
    field: {
      name: "name",
      label: "Название объекта",
      type: "text",
      placeholder: "Например: Уютная студия в центре",
    },
  },
  {
    type: "single",
    field: {
      name: "address",
      label: "Адрес",
      type: "text",
      placeholder: "Улица, дом, квартира",
    },
  },
  {
    type: "row",
    // gridClass: "form-row-2",
    fields: [
      {
        name: "totalFloors",
        label: "Всего этажей",
        type: "number",
        placeholder: "20",
      },
      {
        name: "floor",
        label: "Этаж",
        type: "number",
        placeholder: "5",
      },
    ],
  },
  {
    type: "row",
    fields: [
      {
        name: "square",
        label: "Общая площадь (м²)",
        type: "number",
        placeholder: "60",
      },
      {
        name: "livingSquare",
        label: "Жилая площадь (м²)",
        type: "number",
        placeholder: "30",
      },
      {
        name: "kitchenSquare",
        label: "Площадь кухни (м²)",
        type: "number",
        placeholder: "15",
      },
    ],
  },
  {
    type: "radio-group",
    name: "propertyType",
    label: "Тип недвижимости",
    options: [
      { value: "apartment", label: "Квартира" },
      { value: "house", label: "Дом / Коттедж" },
      { value: "commercial", label: "Коммерческая" },
    ],
  },
  {
    type: "checkbox",
    name: "agree",
    label: "Я соглашаюсь с правилами размещения объявлений",
  },
];
