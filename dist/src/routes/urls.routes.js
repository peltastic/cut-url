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
const authorizeUser_1 = require("../middleware/authorizeUser");
const shortid_1 = __importDefault(require("shortid"));
const valid_url_1 = __importDefault(require("valid-url"));
const config_1 = __importDefault(require("config"));
const urls_service_1 = require("../services/urls.service");
const router = express_1.default.Router();
router.get("/user/urls", authorizeUser_1.authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id;
    try {
        const urls = yield (0, urls_service_1.findAllUserUrls)(user_id);
        return res.status(200).json(urls);
    }
    catch (e) {
        console.log(e);
        return res.status(500).send("Internal Server Error");
    }
}));
router.post("/shorten-url", authorizeUser_1.authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { url } = req.body;
    const user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.user_id;
    if (!valid_url_1.default.isUri(url)) {
        return res.status(401).json({
            message: "Invalid Url",
            success: false,
        });
    }
    try {
        const urlData = yield (0, urls_service_1.findUrl)(user_id);
        if (url === (urlData === null || urlData === void 0 ? void 0 : urlData.url)) {
            return res.status(200).json({
                success: true,
                url: urlData === null || urlData === void 0 ? void 0 : urlData.shortened_url,
            });
        }
        const shortenedUrlCode = shortid_1.default.generate();
        const shortenedUrl = `${config_1.default.get("BASE_URL")}/${shortenedUrlCode}`;
        yield (0, urls_service_1.createShortenedUrl)({
            code: shortenedUrlCode,
            shortened_url: shortenedUrl,
            user_id,
            url,
        });
        return res.status(200).json({
            success: true,
            url: shortenedUrl,
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).send("Internal Server Error");
    }
}));
exports.default = router;
