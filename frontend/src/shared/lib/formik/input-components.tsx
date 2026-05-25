import { createFormField } from "./create-form-field";
import { Input } from "../../ui/input/input";
import { Checkbox } from "../../ui/input/checkbox";
import { Radio } from "../../ui/input/radio";
export const FormikInput = createFormField(Input);
export const FormikCheckbox = createFormField(Checkbox);
export const FormikRadio = createFormField(Radio);
