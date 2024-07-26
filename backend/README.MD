# Nothile's full stack Application

## Front End Documentation

**Welcome :)**

This is the back end documentation for the application. You can find more in depth information about the front end here. Please view the rest of the README below on information on the tech stack, and working with the codebase.

-----

### Tech Stack
The current tech stack for the backend is:

**Node.js**. Node.js is a runtime created based on the _"V8 Engine"_ by Google. This allows us to run our server and also use back end packages. It also provides us with .
>[Node.js](https://nodejs.org/en)

**Expressjs**. Expressjs allows us to run a local server for development. It also is pivotal in helping to develop endpoints on the application.
>[Expressjs](https://expressjs.com/)

**TypeScript**. TypeScript is used to improve the overall quality of the code. This is done by examining the code during writetime instead of runtime, which can also protect the server or other subscribors from accidentally executing unncessary API requests.
>[TypeScript](https://www.typescriptlang.org/)

**Multer**. Multer is used to allow file uploads to be managed, but it also accounts for allowing the response body to be read when handling requests in express.

>[Multer](https://www.npmjs.com/package/multer)

**Cors**. Cors is used to allow perform api requests from one url to another. Without this, then api requests fail by default. We also need to define which domain the API request will initially come from. The domain for the local development server and the live server must be set.

>[Cors](https://www.npmjs.com/package/cors)

**Express**. Express is a key tool that we use in the codebase. It's used to create endpoints, handle requests, start a local server, work with socket.io in order to create subscriptions to other clients.

If you wish to start your local server, run the ```npm run start``` command to start your local server.

**Note: You will have 2 separate consoles when running concurrent servers, so you'll need to check the console in both your browser and your terminal**

>[Express](https://expressjs.com/)

**MongoDB**. Mongo is a document oriented database (which can still use SQL where required). It uses MongoDB Atlas in the browser (you can find it _[here](https://www.mongodb.com/products/platform/atlas-database)_) which can be used to manage your collections and view your data. Mongo is often used natively (mainly through constructing MongoDB instances which can be saved to the backend) or with an ODM. An ODM is an Object Document Mapper, which references an Object (in this case JavaScript) which is used to perform all queries.

A connection is required as your local or production server is running which allows MongoDB to perform operations in your database.

You'll need a file which allows you to connect to the server by requesting it from me.

You can send me an email by request [here](mailto:nothile1@gmail.com)

>[MongoDB](https://www.mongodb.com/)

**Mongoose**. Mongoose is an ODM (Object Document Mapper) specifically for MongoDB. Instead of connecting to MongoDB natively, we connect to Mongoose via our MongoDB URI which we can find from MongoDB Atlas. Mongoose requires schemas for all of our collections, and this is to enjoy both the benefits of a relational and non-relational database.

>[Mongoose](https://mongoosejs.com/docs/)

**SocketIO**. SocketIO is used in the backend for realtime io for features such as livechat or sending updates for user notifications. It allows for communication to the front end without the need for an api to pre-emptively be executed.

>[SocketIO](https://socket.io/)


