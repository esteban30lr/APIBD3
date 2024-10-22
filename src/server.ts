import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';

import User from './routes/user.routes';


class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config() {
        this.app.set('port', process.env.PORT || 3030);
        this.app.use(morgan('dev'));
        this.app.use(compression());
        this.app.use(cors());
    }

    // Función para generar la secuencia de Fibonacci hasta n
    public fibonacciSeries(n: number): number[] {
        const series: number[] = [0, 1];
        for (let i = 2; i <= n; i++) {
            series.push(series[i - 1] + series[i - 2]);
        }
        return series.slice(0, n + 1);
    }

    // Función para verificar si un número es primo
    private isPrime(num: number): boolean {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }

    // Función para generar los primeros n números primos
    private generatePrimes(n: number): number[] {
        const primes: number[] = [];
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
        this.app.use('/user',User)
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

export { Server };
