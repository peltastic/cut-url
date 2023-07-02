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
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6 },
    full_name: { type: String, required: true },
    _id: { type: String, required: true, unique: true, default: (0, uuid_1.v4)() }
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = yield bcrypt_1.default.hash(this.password, 14);
        this.password = hash;
        next();
    });
});
userSchema.methods.isValidPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const compare = yield bcrypt_1.default.compare(password, user.password);
        return compare;
    });
};
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
