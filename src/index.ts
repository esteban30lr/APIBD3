import {Server} from './server';
import './config/dbconnection';

const server = new Server();
server.start();