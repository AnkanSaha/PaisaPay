import multer from 'multer'; // Import multer
import {randomNumber} from 'uniquegen'; // Import uniquegen
import fs from 'fs'; // Import the fs module
import {extname, join} from 'path'; // Import the path module
import { StringKeys } from '../../settings/keys/keys'; // Import the keys


// Ensure 'uploads' directory exists
  const uploadDirectory = join(`${StringKeys.StaticDirectoryName}/`);
  if (!fs.existsSync(uploadDirectory)) {
      fs.promises.mkdir(uploadDirectory, { recursive: true });
  }

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDirectory); // Set the destination folder where uploaded files will be saved
  },
  filename: (_req, file, cb) => {
    randomNumber(100, true).then(RandomValue => { // It will generate a random string of 21 characters
      const uniqueSuffix =  `${RandomValue}-${Date.now()}`; // Generate a unique suffix
      cb(null, `${Date.now()}-${uniqueSuffix}-${Date.now()}${extname(file.originalname)}`); // Set the filename
    })
  },
});

export const Multer = multer({ storage: storage, limits: { fileSize: 5000000 * 1000 } }); // Limit is 5 GB
