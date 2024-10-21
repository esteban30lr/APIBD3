"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URL = 'mongodb+srv://teamoamor4357:cLRR1khUQio2V1LZ@basesdedatos3.79fyq.mongodb.net/';
mongoose_1.default.connect(MONGO_URL, {}).then(() => {
    console.log('Conectado a la base de datos');
}).catch(err => {
    console.error('Error de conexión a la base de datos:', err);
});
