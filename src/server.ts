import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';

class Server {

    public app: express.Application
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config(){
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
        return series.slice(0, n + 1);  // Cortar la serie para incluir solo hasta n
    }

    routes(){
        this.app.get('/api/fibonacci/:number', (req, res) => {
            const num = parseInt(req.params.number, 10);  // Convertir el parámetro a número
            if (isNaN(num) || num < 0) {  // Validar si es un número válido
                return res.status(400).json({ error: 'Debes ingresar un número entero positivo.' });
            }

            const result = this.fibonacciSeries(num);  // Llamar a la función que genera la secuencia
            res.json({ number: num, fibonacciSeries: result });  // Devolver la secuencia en formato JSON
        });
    }

    start(){
        this.app.listen(this.app.get('port'), () =>{
            console.log('server on... ', this.app.get('port'))
        });
    }
}

const server = new Server();
server.start();
