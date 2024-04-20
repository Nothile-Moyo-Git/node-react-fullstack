/**
 * Author : Nothile Moyo
 * Date Published : 01/04/2024
 * License : MIT
 * 
 * This is the file manager file in the utils folder
 * It handles functionality such as deleting files when a product is deleted, and replacing it when it gets updated
 */

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