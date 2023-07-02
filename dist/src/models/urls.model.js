"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const helpers_1 = require("../utils/helpers");
const urlSchema = new mongoose_1.Schema({
    shortened_url: { type: String, required: true },
    url: { type: String, required: true },
    code: { type: String, required: true },
    user_id: { type: String, ref: 'User' },
    clicks: { type: Number, default: 0 },
    date: { type: String, default: (0, helpers_1.getCurrentDate)() }
});
const UrlModel = (0, mongoose_1.model)("Url", urlSchema);
exports.default = UrlModel;
