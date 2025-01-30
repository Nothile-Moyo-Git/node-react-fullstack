/**
 * Author : Nothile Moyo
 * Date Written : 28/01/2024
 * License : MIT
 *
 * This is the utility methods file
 * This creates re-usable functions for different functionality which can be queried from here instead of in each file
 *
 * @method isInt = (number : any) => boolean
 * @method isFloat = (number : any) => boolean
 * @method isValidUrl = (number : any) => boolean
 * @method getCurrentDate = () => string
 * @method getFolderPathFromDate = () => string
 * @method getFileNamePrefixWithDate = () => string
 * @method createReadableDate : (date : Date) => string
 */

import { PostsInterface } from "../@types/index.js";

export const isInt = (number: number | string) => {
  return Number(number) === number && number % 1 === 0;
};

export const isFloat = (number: number | string) => {
  return Number(number) === number && number % 1 !== 0;
};

export const isValidUrl = (url: string) => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ); // validate fragment locator
  return !!urlPattern.test(url);
};

export const getCurrentDate = () => {
  const today = new Date();

  // Get date values
  const yyyy = today.getFullYear();
  const mm = today.getMonth() + 1; // Months start at 0!
  const dd = today.getDate();

  // Convert date into usable string format we can concatenate
  let stringDay = dd.toString();
  let stringMonth = mm.toString();

  // Formatting the months and days to include 0 if it's less than 10
  if (dd < 10) {
    stringDay = "0" + dd.toString();
  }
  if (mm < 10) {
    stringMonth = "0" + mm.toString();
  }

  // Set the current date
  const ddmmyyyy: string = stringDay + "-" + stringMonth + "-" + yyyy;

  return ddmmyyyy;
};

/**
 * @method getFolderPathFromDate
 *
 * Returns the folder path for uploads with the year and month of the upload
 * This should be done recursively with a method for creating folders
 *
 * @returns folderPath : string
 */
export const getFolderPathFromDate = () => {
  const today = new Date();

  // Get date values
  const yyyy = today.getFullYear();
  const mm = today.getMonth() + 1;

  let stringMonth = mm.toString();

  // Formatting the date values to include 0 if it's less than 10
  if (mm < 10) {
    stringMonth = "0" + mm.toString();
  }

  // Set the folder path structure
  const folderPath = yyyy + "/" + stringMonth + "/";

  return folderPath;
};

export const getFileNamePrefixWithDate = () => {
  const today = new Date();

  // Get date values
  const yyyy = today.getFullYear();
  const mm = today.getMonth() + 1;
  const dd = today.getDate();
  const hh = today.getHours();
  const ii = today.getMinutes();
  const ss = today.getSeconds();

  let stringMonth = mm.toString();
  let stringDay = dd.toString();
  let stringHours = hh.toString();
  let stringMinutes = ii.toString();
  let stringSeconds = ss.toString();

  // Formatting the date values to include 0 if it's less than 10/12
  if (mm < 10) {
    stringMonth = "0" + mm.toString();
  }
  if (dd < 10) {
    stringDay = "0" + dd.toString();
  }
  if (hh < 12) {
    stringHours = "0" + hh.toString();
  }
  if (ii < 10) {
    stringMinutes = "0" + ii.toString();
  }
  if (ss < 10) {
    stringSeconds = "0" + ss.toString();
  }

  // Set the folder path structure
  const fullPath =
    yyyy +
    "-" +
    stringMonth +
    "-" +
    stringDay +
    "_" +
    stringHours +
    "-" +
    stringMinutes +
    "-" +
    stringSeconds;

  return fullPath;
};

/**
 * @params date : Date
 *
 * Formats the date into the format dd-mm-yy hh:ii:ss
 *
 * Input a date in any format you wish and it will be converted for you
 *
 * @returns date : String
 */
export const createReadableDate = (dateToFormat: Date) => {
  // Create a new date
  const date = new Date(dateToFormat);

  // Get date values
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const ii = date.getMinutes();
  const ss = date.getSeconds();

  let stringMonth = mm.toString();
  let stringDays = dd.toString();
  let stringHours = hh.toString();
  let stringMinutes = ii.toString();
  let stringSeconds = ss.toString();

  // Formatting the date values to include 0 if it's less than 10
  if (mm < 10) {
    stringMonth = "0" + mm.toString();
  }
  if (dd < 10) {
    stringDays = "0" + dd.toString();
  }
  if (hh < 12) {
    stringHours = "0" + hh.toString();
  }
  if (ii < 10) {
    stringMinutes = "0" + ii.toString();
  }
  if (ss < 10) {
    stringSeconds = "0" + ss.toString();
  }

  const formattedDate =
    yyyy +
    "-" +
    stringMonth +
    "-" +
    stringDays +
    " " +
    stringHours +
    ":" +
    stringMinutes +
    ":" +
    stringSeconds;

  return formattedDate;
};

/**
 * @name generateUploadDate
 * @description a method which takes the uploadedAt property from a post and updates the format and returns it as a string
 *
 * @param date : string
 *
 * @returns uploadDate : string
 */
export const generateUploadDate = (date: Date | string | number) => {
  const dateObject = new Date(date);

  // Generate variables before concatenating the string
  const YYYY = dateObject.getFullYear();
  const M = dateObject.getMonth() + 1;
  const D = dateObject.getDate();
  const H = dateObject.getHours();
  const I = dateObject.getMinutes();

  let MM = M.toString();
  let DD = D.toString();
  let HH = H.toString();
  let II = I.toString();

  // Formatting the date values to include 0 if it's less than 10
  if (M < 10) {
    MM = "0" + M.toString();
  }
  if (D < 10) {
    DD = "0" + D.toString();
  }
  if (H < 12) {
    HH = "0" + H.toString();
  }
  if (I < 10) {
    II = "0" + I.toString();
  }

  const uploadDate = `${YYYY}/${MM}/${DD} ${HH}:${II}`;

  return uploadDate;
};

/**
 * @method getPaginationValues
 *
 * @param currentPage : number
 * @param numberOfPages : number
 *
 * Function to handle pagination to figure out pages required for pagination
 * This method can be used in any controller
 *
 * Pass through your current page, number of pages, limit, previous and next pages
 *
 * This will return values which will determine your previous and upcoming pages
 *
 * You should perform loops using these values, one with the previous values, one for your current page, and one for upcoming values
 *
 * @returns { currentPage : number, numberOfPages : number }
 */
export const getPaginationValues = (
  currentPage: number,
  numberOfPages: number,
) => {
  // Setting variables
  let paginationPrevPagesCount = 0,
    paginationNextPagesCount = 0;
  const previousPageCount = currentPage - 1;
  const upcomingPageCount = numberOfPages - currentPage;

  // Full pagination
  if (previousPageCount > 2 && upcomingPageCount > 2) {
    paginationPrevPagesCount = 2;
    paginationNextPagesCount = 2;
  }

  // More upcoming pages than previous
  if (previousPageCount <= 2 && upcomingPageCount >= 2) {
    paginationPrevPagesCount = previousPageCount;
    paginationNextPagesCount = 4 - previousPageCount;
  }

  // More previous than upcoming pages
  if (previousPageCount >= 2 && upcomingPageCount <= 2) {
    paginationPrevPagesCount = 4 - upcomingPageCount;
    paginationNextPagesCount = upcomingPageCount;
  }

  // If they're both less than or equal to 2
  if (previousPageCount <= 2 && upcomingPageCount <= 2) {
    paginationPrevPagesCount = previousPageCount;
    paginationNextPagesCount = upcomingPageCount;
  }

  return {
    currentPage,
    numberOfPreviousPages: paginationPrevPagesCount,
    numberOfUpcomingPages: paginationNextPagesCount,
  };
};

/**
 * @method validateInputLength
 *
 * This function checks the length of the input in comparison to the offered value
 *
 * @params input : string, maxLength : number
 *
 * @returns boolean
 */
export const validateInputLength = (input: string, maxLength: number) => {
  return input.length >= maxLength;
};

/**
 * @method validateEmailAddress
 *
 * This function validates the email address entered
 *
 * @param email : string
 *
 * @returns boolean
 */
export const validateEmailAddress = (email: string) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

/**
 * @name validatePassword
 * @description Validate the password to make sure it's been 6 and 20 characters and contains at least one lowercase character and one numeric digit
 *
 * @param password : string
 * @returns passwordValid : boolean
 */
export const validatePassword = (password: string) => {
  // Regular expression to compare our passwords to
  const pattern = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;

  // Match the inputs
  if (password.match(pattern)) {
    return true;
  } else {
    return false;
  }
};

/**
 * @name formatPost
 *
 * @description Format the post data and return a new object which handles the timestamps returned from the backend
 * This is
 *
 * @param post : Post
 * @param formattedPost : Post
 */
export const formatPost = (post: PostsInterface) => {
  // Format the date by destructuring the post
  const createdAt = new Date(post ? post.createdAt : "");
  const createdAtFormatted = generateUploadDate(createdAt);

  const updatedAt = new Date(post ? post.updatedAt : "");
  const updatedAtFormatted = createReadableDate(updatedAt);

  // Create a formatted date
  const postFormatted = {
    _id: post?._id,
    fileLastUpdated: post?.fileLastUpdated,
    fileName: post?.fileName,
    title: post?.title,
    imageUrl: post?.imageUrl,
    content: post?.content,
    creator: post?.creator.toString(),
    createdAt: post?.createdAt,
    updatedAt: post?.updatedAt,
  };

  // Format the created and updated date so they're readable in the frontend
  postFormatted.createdAt = createdAtFormatted;
  postFormatted.updatedAt = updatedAtFormatted;

  return postFormatted;
};
