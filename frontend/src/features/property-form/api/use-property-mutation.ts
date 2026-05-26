import { useMutation } from "@tanstack/react-query";
import { postPropertyData } from "./property-api";
import type { PropertyFormValues } from "../property-form.type";

export const usePropertyMutation = () => {
  return useMutation<any, Error, PropertyFormValues>({
    mutationKey: ["property-submit"],
    mutationFn: (data: PropertyFormValues) => postPropertyData(data),
  });
};
