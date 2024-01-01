// All Types
type int = number; // Integer

// All Imports
import express, { json, urlencoded, Express } from "express"; // Import Express
import cluster from "cluster"; // Import Cluster
const { isPrimary } = cluster; // Import isPrimary from Cluster
import { Console } from "outers"; // Import Outers
import { NumberKeys, StringKeys } from "./settings/keys/KeysConfig.keys.settings"; // Import Keys
import MongoDB from "./settings/DB/MongoDB.db"; // Import MongoDB Connection

// Router Related Imports
import MainRouter from "./API/Router"; // Import Main Router
import { CheckHeader } from "./utils/Incoming.Req.Check.utils"; // Import Check Header

let ProcessCopy: int = NumberKeys.CPUCount; // Copy CPU Count
/* This code is using the cluster module in Node.js to create a server that can utilize multiple CPU
cores. */
if (isPrimary) {
	// Print CPU Count
	Console.bright(
		`${NumberKeys.CPUCount} CPU(s) detected With ${StringKeys.Platform} ${StringKeys.Architecture} server : ${StringKeys.FreeRam} GB Free Ram : ${StringKeys.Model}`
	);

	// Fork Cluster
	while (ProcessCopy > 0) {
		cluster.fork();
		ProcessCopy--;
	}

	// Listen for Cluster Online
	/* The `cluster.on('online', worker => { ... })` code block is an event listener that is triggered when
	a worker process in the cluster becomes online and starts running. */
	cluster.on("online", worker => {
		Console.green(`🚀 Worker ${worker.process.pid} started 🚀`);
		Console.blue(`Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`);
		Console.yellow(`Worker ${worker.process.pid} is listening on Port ${NumberKeys.PORT}`);
	});
	// Listen for Cluster Exit
	/* The code block `cluster.on('exit', worker => { ... })` is an event listener that is triggered when a
	worker process in the cluster exits or dies. */
	cluster.on("exit", worker => {
		Console.red(`Worker ${worker.process.pid} died`);
		cluster.fork();
		Console.green(`🚀 Worker ${worker.process.pid} restarted 🚀`);
		Console.blue(`Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`);
		Console.yellow(`Worker ${worker.process.pid} is listening on Port ${NumberKeys.PORT}`);
	});
} else {
	const Server: Express = express(); // Create Express Server

	// Enable All Proxy Settings for Server Security
	Server.set("trust proxy", () => true); // Enable All Proxy Settings

	// Link All Router as MainRouter
	Server.use(
		"/api",
		json({ limit: "999mb" }),
		urlencoded({
			extended: true,
			limit: 5000000 * 1000,
		}),
		CheckHeader,
		MainRouter
	); // Link Main Router
	Console.magenta("Linked All API Endpoints with PaisaPay Server"); // Print Success Message

	// Configure Static Folder
	Server.use(express.static(StringKeys.StaticDirectoryName)); // Configure Static Folder

	// Server Listen
	try {
		Server.listen(NumberKeys.PORT, async () => {
			const DB_Connection_Status = await MongoDB.ClientAccount.Connect(); // Connect to MongoDB
			DB_Connection_Status.status === true
				? Console.yellow(` 🚀 Database Connected & Server is listening on Port ${NumberKeys.PORT} 🚀`)
				: Console.red(` 🚀 Database Connection Failed & Server is listening on Port ${NumberKeys.PORT} 🚀`); // Print Server Status with Database Connection Status
		});
	} catch (err) {
		Console.red(err); // Show log When Error Has Happen
	}
}
