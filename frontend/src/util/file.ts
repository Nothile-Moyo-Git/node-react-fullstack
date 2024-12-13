/**
 * Author : Nothile Moyo
 * Date Published : 01/04/2024
 * License : MIT
 * 
 * This is the file manager file in the utils folder
 * It handles functionality such as deleting files when a product is deleted, and replacing it when it gets updated
 */

import { FileUploadEventType } from "../@types";

/**
 * @name generateBase64FromImage
 * 
 * @description This method converts an uploaded image on the frontend to base64 encode. This allows it to be sent to the backend and converted back into an image
 * 
 * @param imageFile : File
 * 
 * @returns promise : Promise<unknown> (A result of the query conversion to base64)
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

/**
 * @name findImagePathFromPostData
 * 
 * @params filename : string, uploadPath : string
 * 
 * @description This method finds the upload folder and the appropriate month and year
 */
export const findImagePathFromPostData = (filename : string, uploadPath : string) => {

  return "hello world";
};

/**
 * @name getCurrentMonthAndYear
 * 
 * @description : This method gets the current month and year in a YYYY-MM format
 * 
 * @returns string
 */
export const getCurrentMonthAndYear = () => {

  const date = new Date();

  // Get current month and year and concatenate them in a string
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  // Format the month to work appropriately
  let stringMonth = currentMonth.toString();
  if (currentMonth < 10) { stringMonth = '0' + currentMonth.toString(); };

  return `${currentYear}/${stringMonth}`;
};

/**
 * @name fileUploadHandler
 * 
 * @description Handles the fileupload for the frontend, calls the api request too and returns the appropriate response
 * 
 * @param uploadFile : File
 */
export const fileUploadHandler = async (uploadFile : File) => {

  const fields = new FormData();
  fields.append("image", uploadFile)

  // File upload response
  const fileUploadResponse = await fetch(`/rest/post/file-upload`, {
    method : 'POST',
    body : fields
  });

  // Get the file data we need to send to the api request
  const fileUploadData = await fileUploadResponse.json();
  const fileData = { 
    fileName : fileUploadData.fileName,
    imageUrl : fileUploadData.imageUrl,
    isFileValid : fileUploadData.isFileValid,
    isFileSizeValid : fileUploadData.isFileSizeValid,
    isFileTypeValid : fileUploadData.isFileTypeValid,
    isImageUrlValid : fileUploadData.isImageUrlValid
  };

  return fileData;
};

export const setImage = async () => {

};

// File upload handler, this is done so we can encode the file in a b64 format which allows us to send it to the backend
export const fileUploadEvent = async ({event, setUploadFile, setImagePreview, setShowImagePreview} : FileUploadEventType) => {

  // Set the file so that it's ready for upload
  if (event.target.files) {

    const file = event.target.files[0];

    // Raise and error and empty the input, otherwise, set the state to sent to the backend
    // Note: This is for UX purposes, file uploads are also verified in the backend
    if (file.size > 5000000) {
      alert("Please upload a file smaller than 5MB");
      event.target.value = "";
    }else{
      setUploadFile(file);
      const base64Image = await generateBase64FromImage(file);
      setImagePreview(base64Image);
      setShowImagePreview(true);
    }
  }
}