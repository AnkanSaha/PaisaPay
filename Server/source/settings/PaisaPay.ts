// All Types
type int = number; // Integer

// All Imports
import express from 'express'; // Import Express
import {cpus, platform, freemem} from 'os'; // Import OS
import cluster from 'cluster'; // Import Cluster
const { isPrimary } = cluster; // Import isPrimary from Cluster
import {green, red, yellow, blue, magenta, bright} from 'outers'; // Import Outers
import {NumberKeys} from './keys/keys'; // Import Keys
import MongoInstances from './MongoDB/MongoDB'; // Import MongoDB Connection

// Router Related Imports
import MainRouter from '../API/Router'; // Import Main Router
import { CheckHeader } from '../Helper/Incoming Request Checker';

// CPU Count
let CPUCount: int = cpus().length;
// Start Server with Cluster Module
if (isPrimary) {
	// Print CPU Count
	bright(`${CPUCount} CPU(s) detected With ${platform()} server : ${(freemem() / 1024 / 1024 / 1024).toFixed(2)} GB Free Ram : ${cpus()[0].model}`);

	// Fork Cluster
	while (CPUCount > 0) {
		cluster.fork();
		CPUCount--;
	}

	// Listen for Cluster Online
	cluster.on('online', worker => {
		green(`🚀 Worker ${worker.process.pid} started 🚀`);
		blue(`Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`)
		yellow(`Worker ${worker.process.pid} is listening on Port ${NumberKeys.PORT}`)
		
	});
	// Listen for Cluster Exit
	cluster.on('exit', worker => {
		red(`Worker ${worker.process.pid} died`);
		cluster.fork();
		green(`🚀 Worker ${worker.process.pid} restarted 🚀`);
		blue(`Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`)
		yellow(`Worker ${worker.process.pid} is listening on Port ${NumberKeys.PORT}`)
	});
} else {
	const Server = express(); // Create Express Server

	// Link All Router as MainRouter
	Server.use('/api', CheckHeader, MainRouter); // Link Main Router
	magenta('Linked All API Endpoints with PaisaPay Server'); // Print Success Message

	// Server Listen
	try {
		Server.listen(NumberKeys.PORT, async () => {
			const DB_Connection_Status = await MongoInstances.ClientAccount.Connect(); // Connect to MongoDB
			DB_Connection_Status.status === true ? yellow(` 🚀 Finally, Database Connected & Server is listening on Port ${NumberKeys.PORT} 🚀`) : red(` 🚀 Database Connection Failed & Server is listening on Port ${NumberKeys.PORT} 🚀`); // Print Server Status with Database Connection Status
		});
	} catch (err) {
		red(err);
	}
}
