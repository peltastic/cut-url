import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import { IAddUserToRequest } from "../interfaces/request.interface";
import { IJwtExpectedPayload } from "../interfaces/jwt.interfaces";

const { TokenExpiredError } = jwt;
const catchTokenExpiredError = (err: any, res: Response) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized ! Access Token was Expired" });
  }
  return res.status(401).send({ message: "Unauthorized!" });
};

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  const authHeader: any =
    req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).send({ success: false, message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).send({
      message: "No token provides!",
      success: false,
    });
  }
  try {
    const decoded = jwt.verify(token, config.get<string>("JWT_SECRET_KEY")) as IJwtExpectedPayload;
    (req as IAddUserToRequest).user = decoded;
    next();
  } catch (err) {
    catchTokenExpiredError(err, res);
  }
};

