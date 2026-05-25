import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    required: "Поле обязательно для заполнения",
  },
  number: {
    min: "Значение не может быть меньше ${min}",
    max: "Значение не может быть больше ${max}",
  },
  string: {
    min: "Значение не может быть меньше ${min}",
    max: "Значение не может быть больше ${max}",
  },
});

Yup.addMethod(Yup.number, "moreThanSumOfFields", function (fields: string[], message?: string) {
  return this.test("moreThanSumOfFields", message, function (value) {
    const { parent } = this;
    if (value === undefined || value === null) return true;
    
    const sum = fields.reduce((acc, fieldName) => {
      const val = parent[fieldName];
      return acc + (typeof val === "number" ? val : 0);
    }, 0);
    
    return value > sum;
  });
});

declare module "yup" {
  interface NumberSchema {
    moreThanSumOfFields(fields: string[], message?: string): this;
  }
}

export default Yup;
