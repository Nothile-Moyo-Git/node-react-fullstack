/**
 * Author : Nothile Moyo
 * Date Published : 01/04/2024
 * License : MIT
 * 
 * This is the file manager file in the utils folder
 * It handles functionality such as deleting files when a product is deleted, and replacing it when it gets updated
 */

import fs from "fs";

/**
 * deleteFile method
 * Deletes a file with a required filepath
 * 
 * @param filePath : string
 * @returns void
 */
const deleteFile = (filePath : string) => {

    let fileExists : boolean;

    // Check if the file with the name already exists
    fs.access(filePath, fs.constants.F_OK, (err : Error | null) => {

        fileExists = err ? false : true; 
        console.log(`${filePath} ${err ? 'does not exist' : 'exists :)'}`);

        // Execute our file deletion here since this code runs asynchronously
        fileExists === true && fs.unlink(filePath, (err) => {
            err ? console.log("Error: File was not deleted") : console.log("File was successfully deleted");
        });
        
    });
};

/**
 * @name generateBase64FromImage
 * 
 * @description This method converts an uploaded image on the frontend to base64 encode. This allows it to be sent to the backend and converted back into an image
 * 
 * @param imageFile : File
 * 
 * @returns promise : Promise (A result of the query conversion to base64)
 */
export const generateBase64FromImage = (imageFile : File) => {
  
  // Initiate our file reader
  const reader = new FileReader();

  // Read the file and encode it in base 64
  const promise = new Promise((resolve, reject) => {

    reader.onload = (event : ProgressEvent<FileReader>) => {
      event.target && resolve(event.target.result);
    }
    
    reader.onerror = err => reject(err);
  });

  reader.readAsDataURL(imageFile);

  return promise;
};

export { deleteFile };