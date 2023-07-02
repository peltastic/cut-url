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
const urls_service_1 = require("../services/urls.service");
const router = express_1.default.Router();
router.get("/:code", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    try {
        const url = yield (0, urls_service_1.findUrl)(code);
        if (url) {
            yield (0, urls_service_1.updateClicks)(url.clicks, code);
            return res.redirect(url.url);
        }
        else {
            return res.status(404).json("No Url Found");
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
}));
exports.default = router;
