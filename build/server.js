"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3030);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, compression_1.default)());
        this.app.use((0, cors_1.default)());
    }
    // Función para generar la secuencia de Fibonacci hasta n
    fibonacciSeries(n) {
        const series = [0, 1];
        for (let i = 2; i <= n; i++) {
            series.push(series[i - 1] + series[i - 2]);
        }
        return series.slice(0, n + 1); // Cortar la serie para incluir solo hasta n
    }
    routes() {
        this.app.get('/api/fibonacci/:number', (req, res) => {
            const num = parseInt(req.params.number, 10); // Convertir el parámetro a número
            if (isNaN(num) || num < 0) { // Validar si es un número válido
                return res.status(400).json({ error: 'Debes ingresar un número entero positivo.' });
            }
            const result = this.fibonacciSeries(num); // Llamar a la función que genera la secuencia
            res.json({ number: num, fibonacciSeries: result }); // Devolver la secuencia en formato JSON
        });
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on... ', this.app.get('port'));
        });
    }
}
exports.Server = Server;
