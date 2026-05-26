import axios from "axios";
import type { IHandleRequest } from "./base-response.types";

export const HandleRequest = async <T = unknown>({
  url,
  method,
  data,
}: IHandleRequest<T>) => {
  const response = await axios({
    url,
    method,
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
