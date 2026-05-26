import { HandleRequest } from "../../../shared/api/base-response";
import { EMethod } from "../../../shared/api/base-response.types";
import type { PropertyFormValues } from "../property-form.type";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const postPropertyData = (data: PropertyFormValues) => {
  return HandleRequest({ 
    url: `${API_BASE_URL}/browse/`, 
    method: EMethod.POST, 
    data: { url: data.url } 
  });
};
