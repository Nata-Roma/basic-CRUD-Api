import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';
import { DB, db } from './db';
import { SingleServer } from './server';


const startMulti = async (db: DB) => {
    const numCPUs = cpus().length;

    if (cluster.isPrimary) {
        console.log(`Primary ${process.pid} is running`);

        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });
    } else {
        const server = new SingleServer(db);
        //require('./server');
        console.log(`Worker ${process.pid} started`);
    }
};

startMulti(db);
