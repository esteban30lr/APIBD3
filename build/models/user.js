"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    username: { type: String, require: true, unique: true, lowercase: true },
    createDate: { type: Date, default: Date.now() }
});
exports.default = (0, mongoose_1.model)("user", UserSchema);
