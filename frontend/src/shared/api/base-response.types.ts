export const EMethod = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
  PUT: "PUT",
} as const;

export type EMethod = typeof EMethod[keyof typeof EMethod];

export interface IHandleRequest<T = unknown> {
  url: string;
  method: EMethod;
  data: T;
}
