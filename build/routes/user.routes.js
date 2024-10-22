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
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
class userRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routesUser();
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.default.find();
            return res.json({ code: 200, user: users });
        });
    }
    postUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = new user_1.default(req.body);
            yield users.save();
            return res.json({ code: 200, user: users });
        });
    }
    saludar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json({
                saludar: 'HOLA MUNDO'
            });
        });
    }
    otroSaludar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json({
                saludar: 'HOLA MUNDO'
            });
        });
    }
    routesUser() {
        this.router.get('/', this.saludar);
        this.router.get('/otroSaludar', this.otroSaludar);
        this.router.get('/getUsers', this.getUser);
        this.router.post('/postUser', this.postUser);
    }
}
const user = new userRouter();
exports.default = user.router;
