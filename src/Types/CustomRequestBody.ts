import { Request } from "express";

interface CustomRequestBody<T> extends Request{
  body: T
}

export type { CustomRequestBody }