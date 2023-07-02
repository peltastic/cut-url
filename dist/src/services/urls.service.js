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
exports.updateClicks = exports.findAllUserUrls = exports.findUrl = exports.createShortenedUrl = void 0;
const urls_model_1 = __importDefault(require("../models/urls.model"));
function createShortenedUrl(body) {
    return __awaiter(this, void 0, void 0, function* () {
        yield urls_model_1.default.create(body);
    });
}
exports.createShortenedUrl = createShortenedUrl;
function findUrl(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const urlData = yield urls_model_1.default.findOne({
            code
        });
        return urlData;
    });
}
exports.findUrl = findUrl;
function findAllUserUrls(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const urls = yield urls_model_1.default.find({
            user_id,
        });
        return urls;
    });
}
exports.findAllUserUrls = findAllUserUrls;
const updateClicks = (clickCount, code) => __awaiter(void 0, void 0, void 0, function* () {
    yield urls_model_1.default.updateOne({ code }, {
        clicks: clickCount + 1,
    });
});
exports.updateClicks = updateClicks;
