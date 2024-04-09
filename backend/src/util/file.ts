/**
 * Author : Nothile Moyo
 * Date Published : 28/01/2024
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
export const deleteFile = (filePath : string) => {

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
 * checkFileType method
 * Returns the mimetype of the uploaded file for debugging purposes
 * 
 * @param file : File
 * @return fileType : string
 */
export const checkFileType = (file : Express.Multer.File) => { 
    return file.mimetype; 
};