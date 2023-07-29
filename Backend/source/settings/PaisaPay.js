// All Imports
import express from "express"; // Import Express
import { cpus } from "os"; // Import OS
import cluster from "cluster"; // Import Cluster
import { green, red } from "outers"; // Import Outers
import { NumberKeys } from "./keys/keys.js"; // Import Keys
import {ConnectMongoInstance} from "./MongoDB/MongoDB.js"; // Import MongoDB Connection
import MainRouter from "../Router/Router.js"; // Import Main Router

// CPU Count
let CPUCount = cpus().length;

// Start Server with Cluster Module
if (cluster.isPrimary) {
  // Print CPU Count
  green(`${CPUCount} CPU(s) detected`);
  // Fork Cluster
  while (CPUCount > 0) {
    cluster.fork();
    CPUCount--;
  }
  // Listen for Cluster Exit
  cluster.on("exit", (worker) => {
    red(`Worker ${worker.process.pid} died`);
    cluster.fork();
    green(`Worker ${worker.process.pid} restarted`);
  });
} else {
  const Server = express(); // Create Express Server

  // Link All Router as MainRouter
  Server.use('/api', MainRouter); // Link Main Router
  green("Linked All Routers with PaisaPay Server"); // Print Success Message
  
  // Server Listen
  try {
    Server.listen(NumberKeys.PORT, async () => {
      await ConnectMongoInstance.Connect(); // Connect to MongoDB
      green(`Server Started on Port ${NumberKeys.PORT}`);
    });
  } catch (err) {
    red(err);
  }
}
