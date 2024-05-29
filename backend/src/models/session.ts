/**
 * Date created : 31/01/2024
 * 
 * Author : Nothile Moyo
 * 
 * Session Model description
 * Handles the typing for the session details that will be uploaded and gets queried to the front end
 * 
 * Note: Static methods are used here since we don't always need to instantiate our Object (e.g deletion)
 * 
 * Note: The typing for this should be done as a generic when updating the type 
*/

import mongoose, { Model } from "mongoose";
import { SessionsInterface } from "../@types";

// Setting our types to be used in Mongoose
type SessionModel = Model<SessionsInterface, {}, {}>

// Define our schema for the sessions collection in the backend using Mongoose
const sessionSchema = new mongoose.Schema<SessionsInterface>({

    expires : { type : String, expires : "2m", required : true },
    token : { type : String, required : true },
    creator : { type : mongoose.Schema.Types.ObjectId, required : true, ref : 'User' },
    expireAt : { type : Date, expires : "2w", default : Date.now() + 604800000 }
},{
    timestamps : true
});

// Create our model for exporting
const Session = mongoose.model<SessionsInterface, SessionModel>("Session", sessionSchema);

export default Session;
