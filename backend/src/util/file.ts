/**
 * Author : Nothile Moyo
 * Date Published : 28/01/2024
 * License : MIT
 *
 * This is the file manager file in the utils folder
 * It handles functionality such as deleting files when a product is deleted, and replacing it when it gets updated
 */

import fs from "fs";
import { Express } from "express";

/**
 * @name deleteFile
 *
 * @description Delete a file using a relative filepath from the request.
 * You can find the filepath by checking for "request.file.path" when handling an endpoint
 * This is assuming that you're using "multer" to upload files.
 *
 * You can find the download for "multer" here : https://www.npmjs.com/package/multer
 *
 * @param filePath : string
 * @returns void
 */
export const deleteFile = async (filePath: string) => {
  try {
    // Check if the file exists using fs.access
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // File does not exist
        console.log(`${filePath} does not exist.`);
      } else {
        // File exists, proceed to delete
        fs.unlink(filePath, (deleteErr) => {
          if (deleteErr) {
            console.log("Error: File was not deleted");
          } else {
            console.log("File was successfully deleted");
          }
        });
      }
    });
  } catch (error) {
    console.log("Deletion error");
    console.log(error);
  }
};

/**
 * @name checkFileType
 *
 * @description Returns the mimetype of the uploaded file for debugging purposes
 *
 * @param file : File
 * @return fileType : string
 */
export const checkFileType = (file: Express.Multer.File) => {
  return file.mimetype;
};

/**
 * @name getCurrentMonthAndYear
 *
 * @description : This method gets the current month and year in a YYYY-MM format
 */
export const getCurrentMonthAndYear = () => {
  const date = new Date();

  // Get current month and year and concatenate them in a string
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  // Format the month to work appropriately
  let stringMonth = currentMonth.toString();
  if (currentMonth < 10) {
    stringMonth = "0" + currentMonth.toString();
  }

  return `${currentYear}/${stringMonth}`;
};
