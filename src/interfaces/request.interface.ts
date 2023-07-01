import { Request } from "express";
import { IJwtExpectedPayload } from "./jwt.interfaces";

export interface IAddUserToRequest extends Request {
  user: IJwtExpectedPayload | null;
}
