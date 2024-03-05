// All Imports
import express, { json, urlencoded, Express } from "express"; // Import Express
import { FunctionBased } from "outers"; // Import Outers
import { NumberKeys, StringKeys } from "./settings/keys/KeysConfig.keys.settings"; // Import Keys
import { ConnectDB } from "./settings/DB/MongoDB.db"; // Import MongoDB Connection

// Router Related Imports
import MainRouter from "./API/Router"; // Import Main Router

/* This code is using the cluster module in Node.js to create a server that can utilize multiple CPU
cores. */

const Server: Express = express(); // Create Express Server

// Enable All Proxy Settings for Server Security
Server.set("trust proxy", () => true); // Enable All Proxy Settings

// Enable JSON & URL Encoded Body Parser
Server.use(json({ limit: "999mb" })); // Enable JSON Body Parser
Server.use(
	urlencoded({
		extended: true,
		limit: "999mb",
		parameterLimit: 100000,
		inflate: true,
	})
); // Enable URL Encoded Body Parser

// Link All Router as MainRouter
Server.use("/api", MainRouter); // Link Main Router

// Configure Static Folder
Server.use(express.static(StringKeys.StaticDirectoryName)); // Configure Static Folder

FunctionBased.ClusterCreator(Server, NumberKeys.PORT, NumberKeys.CPUCount, [], [ConnectDB]); // Create Cluster with Port and CPU Count