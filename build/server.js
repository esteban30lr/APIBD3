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
const user_routes_1 = __importDefault(require("./routes/user.routes"));
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
        this.app.use(express_1.default.json());
    }
    // Función para generar la secuencia de Fibonacci hasta n
    fibonacciSeries(n) {
        const series = [0, 1];
        for (let i = 2; i <= n; i++) {
            series.push(series[i - 1] + series[i - 2]);
        }
        return series.slice(0, n + 1);
    }
    // Función para verificar si un número es primo
    isPrime(num) {
        if (num < 2)
            return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0)
                return false;
        }
        return true;
    }
    // Función para generar los primeros n números primos
    generatePrimes(n) {
        const primes = [];
        let count = 0;
        let num = 2;
        while (count < n) {
            if (this.isPrime(num)) {
                primes.push(num);
                count++;
            }
            num++;
        }
        return primes;
    }
    routes() {
        this.app.use('/user', user_routes_1.default);
        // Ruta para la secuencia de Fibonacci
        this.app.get('/api/fibonacci/:number', (req, res) => {
            const num = parseInt(req.params.number, 10);
            if (isNaN(num) || num < 0) {
                return res.status(400).json({ error: 'Debes ingresar un número entero positivo.' });
            }
            const result = this.fibonacciSeries(num);
            res.json({ number: num, fibonacciSeries: result });
        });
        // Ruta para obtener números primos
        this.app.get('/api/primos/:count', (req, res) => {
            const count = parseInt(req.params.count, 10);
            if (isNaN(count) || count <= 0) {
                return res.status(400).json({ error: 'Debes ingresar un número entero positivo.' });
            }
            const primeNumbers = this.generatePrimes(count);
            res.json({ count, primes: primeNumbers });
        });
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on... ', this.app.get('port'));
        });
    }
}
exports.Server = Server;
