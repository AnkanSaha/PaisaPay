// All Types
type int = number; // Integer

// All Imports
import express, {json, urlencoded} from 'express'; // Import Express
import { cpus, platform, freemem } from 'os'; // Import OS
import cluster from 'cluster'; // Import Cluster
const { isPrimary } = cluster; // Import isPrimary from Cluster
import { green, red, yellow, blue, magenta, bright } from 'outers'; // Import Outers
import { NumberKeys } from './keys/keys'; // Import Keys
import MongoDB from './MongoDB/MongoDB'; // Import MongoDB Connection

// Router Related Imports
import MainRouter from '../API/Router'; // Import Main Router
import { CheckHeader } from '../Helper/Incoming Request Checker';

// CPU Count
let CPUCount: int = cpus().length;
/* This code is using the cluster module in Node.js to create a server that can utilize multiple CPU
cores. */
if (isPrimary) {
	// Print CPU Count
	bright(`${CPUCount} CPU(s) detected With ${platform()} server : ${(freemem() / 1024 / 1024 / 1024).toFixed(2)} GB Free Ram : ${cpus()[0].model}`);

	// Fork Cluster
	/* The code block `while (CPUCount > 0) {
		cluster.fork();
		CPUCount--;
	}` is creating multiple worker processes using the `cluster.fork()` method. */
	while (CPUCount > 0) {
		cluster.fork();
		CPUCount--;
	}

	// Listen for Cluster Online
	/* The `cluster.on('online', worker => { ... })` code block is an event listener that is triggered when
	a worker process in the cluster becomes online and starts running. */
	cluster.on('online', worker => {
		green(`🚀 Worker ${worker.process.pid} started 🚀`);
		blue(`Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`)
		yellow(`Worker ${worker.process.pid} is listening on Port ${NumberKeys.PORT}`)

	});
	// Listen for Cluster Exit
	/* The code block `cluster.on('exit', worker => { ... })` is an event listener that is triggered when a
	worker process in the cluster exits or dies. */
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
	Server.use('/api', json(), urlencoded({extended:true, limit:5000000 * 1000}), CheckHeader, MainRouter); // Link Main Router
	magenta('Linked All API Endpoints with PaisaPay Server'); // Print Success Message


	// Configure Static Folder
	Server.use(express.static('Data')); // Configure Static Folder

	// Server Listen
	try {
		Server.listen(NumberKeys.PORT, async () => {
			const DB_Connection_Status = await MongoDB.ClientAccount.Connect(); // Connect to MongoDB
			DB_Connection_Status.status === true ? yellow(` 🚀 Finally, Database Connected & Server is listening on Port ${NumberKeys.PORT} 🚀`) : red(` 🚀 Database Connection Failed & Server is listening on Port ${NumberKeys.PORT} 🚀`); // Print Server Status with Database Connection Status
		});
	} catch (err) {
		red(err);
	}
}
