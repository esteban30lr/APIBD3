"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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

    // Función recursiva para obtener el número de Fibonacci en la posición n
    fibonacci(n) {
        if (n <= 1) {
            return n; // Casos base: Fibonacci(0) = 0, Fibonacci(1) = 1
        }
        return this.fibonacci(n - 1) + this.fibonacci(n - 2); // Llamadas recursivas
    }

    // Función para generar la secuencia de Fibonacci hasta n de manera recursiva
    fibonacciSeries(n) {
        const series = [];
        for (let i = 0; i <= n; i++) {
            series.push(this.fibonacci(i)); // Llamar a la función recursiva para cada número
        }
        return series;
    }

    // Función para generar una lista de números primos hasta n
    primeNumbers(n) {
        const primes = [];
        for (let num = 2; num <= n; num++) {
            let isPrime = true;
            for (let i = 2; i <= Math.sqrt(num); i++) {
                if (num % i === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                primes.push(num);
            }
        }
        return primes;
    }

    routes() {
        // Ruta para la secuencia de Fibonacci (recursiva)
        this.app.get('/api/fibonacci/:number', (req, res) => {
            const num = parseInt(req.params.number, 10); // Convertir el parámetro a número
            if (isNaN(num) || num < 0) { // Validar si es un número válido
                return res.status(400).json({ error: 'Debes ingresar un número entero positivo.' });
            }
            const result = this.fibonacciSeries(num); // Llamar a la función recursiva que genera la secuencia
            res.json({ number: num, fibonacciSeries: result }); // Devolver la secuencia en formato JSON
        });

        // Nueva ruta para obtener números primos
        this.app.get('/api/primes/:number', (req, res) => {
            const num = parseInt(req.params.number, 10); // Convertir el parámetro a número
            if (isNaN(num) || num < 2) { // Validar si es un número válido (debe ser mayor o igual a 2)
                return res.status(400).json({ error: 'Debes ingresar un número entero mayor o igual a 2.' });
            }
            const result = this.primeNumbers(num); // Llamar a la función que genera los números primos
            res.json({ number: num, primes: result }); // Devolver los números primos en formato JSON
        });
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on... ', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();
