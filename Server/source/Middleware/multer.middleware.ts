import multer from "multer"; // Import multer
import fs from "fs"; // Import the fs module
import { extname, join } from "path"; // Import the path module
import { StringKeys } from "../settings/keys/KeysConfig.keys.settings"; // Import the keys
import { ClassBased } from "outers"; // Import the outers module

// Ensure 'uploads' directory exists
const uploadDirectory = join(`${StringKeys.StaticDirectoryName}/`);
if (!fs.existsSync(uploadDirectory)) {
	fs.promises.mkdir(uploadDirectory, { recursive: true });
}

// Generate a random digits with class
const Generator = new ClassBased.UniqueGenerator(100);

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, uploadDirectory); // Set the destination folder where uploaded files will be saved
	},
	filename: (_req, file, cb) => {
		// It will generate a random string of 21 characters
		const RandomValue = Generator.RandomNumber(true);
		const uniqueSuffix = `${RandomValue}-${Date.now()}`; // Generate a unique suffix
		cb(null, `${Date.now()}-${uniqueSuffix}-${Date.now()}${extname(file.originalname)}`); // Set the filename
	},
});

export const Multer = multer({ storage: storage, limits: { fileSize: 50000000 * 1000 } }); // Limit is 50GB
