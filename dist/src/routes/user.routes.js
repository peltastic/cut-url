"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_service_1 = require("../services/users.service");
const config_1 = __importDefault(require("config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, full_name } = req.body;
    if (password.length < 6) {
        return res.status(400).send({
            message: "Password too Short",
            success: false
        });
    }
    const emailExists = yield (0, users_service_1.CheckEmail)(email);
    if (emailExists) {
        return res.status(400).send({
            message: "Email Already Exists!",
            success: false
        });
    }
    yield (0, users_service_1.CreateUser)({ email, password, full_name });
    return res.status(201).json({
        success: true,
        message: "User Signed Up Successfully",
    });
}));
router.post("/login-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const emailExists = yield (0, users_service_1.CheckEmail)(email);
    if (!emailExists) {
        return res.status(401).send({
            message: "Invalid Email or Passwords",
            success: false
        });
    }
    const user = yield (0, users_service_1.FindEmail)(email);
    const isValidPassword = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
    if (!isValidPassword) {
        return res.status(401).send({
            message: "Invalid Email or Password",
            success: false
        });
    }
    const payload = {
        user_id: user === null || user === void 0 ? void 0 : user._id,
        email: user === null || user === void 0 ? void 0 : user.email,
    };
    const token = jsonwebtoken_1.default.sign(payload, config_1.default.get("JWT_SECRET_KEY"), {
        expiresIn: "30d"
    });
    return res.status(200).json({
        success: true,
        message: "User Logged In Successfully",
        token,
    });
}));
exports.default = router;
