import mongoose from "mongoose";

const MONGO_URL = 'mongodb+srv://teamoamor4357:cLRR1khUQio2V1LZ@basesdedatos3.79fyq.mongodb.net/';

mongoose.connect(MONGO_URL, {
}).then(() => {
    console.log('Conectado a la base de datos');
}).catch(err => {
    console.error('Error de conexión a la base de datos:', err);
});
