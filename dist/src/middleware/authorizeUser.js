"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const { TokenExpiredError } = jsonwebtoken_1.default;
const catchTokenExpiredError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res
            .status(401)
            .send({ message: "Unauthorized ! Access Token was Expired" });
    }
    return res.status(401).send({ message: "Unauthorized!" });
};
const authorize = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))) {
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
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.get("JWT_SECRET_KEY"));
        req.user = decoded;
        next();
    }
    catch (err) {
        catchTokenExpiredError(err, res);
    }
};
exports.authorize = authorize;
