export interface PropertyFormValues {
  name: string;
  address: string;
  floor: number | "";
  totalFloors: number | "";
  square: number | "";
  livingSquare: number | "";
  kitchenSquare: number | "";
  propertyType: string;
  agree: boolean;
}

export interface FieldConfig {
  name: keyof PropertyFormValues;
  label: string;
  type?: "text" | "number" | "email" | "password" | "tel";
  placeholder?: string;
}
export type FormRowConfig =
  | {
      type: "single";
      field: FieldConfig;
    }
  | {
      type: "row";
      fields: FieldConfig[];
    }
  | {
      type: "radio-group";
      name: keyof PropertyFormValues;
      label: string;
      options: { value: string; label: string }[];
    }
  | {
      type: "checkbox";
      name: keyof PropertyFormValues;
      label: string;
    };
