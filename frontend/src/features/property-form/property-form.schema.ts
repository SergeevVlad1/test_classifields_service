import Yup from "../../shared/lib/yup/yup-init";

export const validationSchema = Yup.object().shape({
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
