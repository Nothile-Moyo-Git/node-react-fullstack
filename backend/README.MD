# Nothile's full stack Application

## Back End Documentation

**Welcome :)**

This is the back end documentation for the application. You can find more in depth information about the front end here. Please view the rest of the README below on information on the tech stack, and working with the codebase.

-----

### Commands

> Start local backend server
```
npm run start
```

> Check lint
```
npm run lint
```

> Run tests
```
npm run test
```

> Create a production build
```
npm run build
```

> Deploy a production build
```
npm run deploy
```

-----

### Tech Stack
The current tech stack for the backend is:

**Node.js**. Node.js is a runtime created based on the _"V8 Engine"_ by Google. This allows us to run our server and also use back end packages. It's also used to create production builds.
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

**JWT** JWT, standing for json web token, is a tool that allows encrypted tokens to be used. This is typically for authentication. A token value is also used, as well as encryption to ensure that rogue queries can't be performed by an inauthenticated user.

>[JWT](https://jwt.io/)

**GraphQL**. GraphQL is "Graph Query Language". You can find more information about this on the "GraphQL Endpoints" section of this document.

>[GraphQL](https://graphql.org/)

-----

### Production and deployment

When running the local server, navigate to the following endpoint. It will return a JSON with a message inside it.

```
http://localhost:4000/test
```

Production builds can be found in the _"build"_ folder. The production is your compiled javascript code found from _"src"_.

**This application is deployed on Vercel for the backend only. The .env files have been copied on vercel and have *NOT* been pushed to git**

-----

### MVC Architecture

The backend uses the MVC architecture. MVC stands for _"Model View Controller"_. 

The _**Model**_ represents the structure of the backend and the handles all the logic for interacting with the database. It handles requests that it receives from Controllers. The model also handled _context_ which is data available outside of the initial scope of the view.

The _**View**_ represents the UI used with the application. This can be done by either using a de-coupled web application (which has been done here), or a template. An example of this would be ejs. 

The _**Controller**_ represents middleware which allows requests to be handled. Typically, this is done by routing either a view or a request to the appropriate model method. A response is given which is then returned to the front end in this application.

-----

### Routing

You can find the routes from _"backend/src/routes"_. The routes assign api requests to the appropriate controller which is then used to handle the request. 

No views are rendered with these routes as the web application is de-coupled. The routes are written in express which are then handled by the server.

Unlike the front end, requests are handled without a basename.

-----

### File Storage

Multer is used to handle file uploads. This works by using an event handler on the front end to turn the image into a base64 image. This is sent to the backend and decoded back into an image. In the _index.ts_ file, we set up the location of where we store the file (which is based on the date/month of upload). Files are saved with a name that is used to format them.

**Note: If you change the name of an image, it won't be deleted as there won't be a reference point anymore**.

-----

### Websockets

The socket.io implemention acts as an extension to the express server found in _"index.ts"_. You can find the socket code in _"socket.ts"_. This code uses a module export so that the socket functionality (mostly emitting and broadcasting) can be reused on individual controllers as opposed to just the main index file. 

Regarding the livechat, it both uses the live server but also stores the messages in the "chats" collection found in MongoDB.

-----

### GraphQL Endpoints

GraphQL is a query language that is used to make specific requests which improves performance and flexibility when requesting data from the backend.

Some of the features that make it popular are it's flexible queries which promote efficient data fetching, only fetching the _resources_ that you actually need, instead of all the results from a relational query.

It also allows you request multiple resources from one location, reducing the number of frequent queries required to extract data.

On the other hand, writing **GraphQL** queries in the frontend can be more complicated than using REST, and functionality such as file uploads are best completed in REST and not GraphQL. Data fetching tends to be ideal.

**Note: You can query GraphQL endpoints with the uri '/graphql/*'.**

_Note: You can find your schemas in "/src/data/schemas". The schema houses type definitions, queries (requests for data) and mutations (requests and modifications for data)._

_Note: You can find your resolvers in "/src/data/resolvers". The resolvers handle the queries to the backend for the mutations and queries from MongoDB_

-----

### REST Endpoints

The endpoints that can't be handled by GraphQL are handled by REST queries. These are for chats, websockets and file uploads. This is because GraphQL doesn't natively support file uploads, and that websockets don't work alongside GraphQL either. 

**Note: The base endpoint for rest is _/rest/uri_, if a route isn't handled, an error is returned**

_Note: You can find the routes in "/src/routes"._

-----

### Cookies

Cookies are used and stored in the browser for session functionality. We also use them to store user data for the user who is currently logged in. Users are logged in for 2 week periods and if their login expires then they're locked off from executing certain routes.

This also stops random attempts to query the backend without the proper authentication.

In the interest of this application however, an encrypted token is sent to the backend which is using the _"sessions"_ collection. A json web token 

-----

### Security

Regarding security for this application, many steps have been taken to ensure the security of the application.

**Note: This is a dummy application so some security measures may not have been taken**.

Regarding requests, cors is implemented which allows only specified domains to query the backend. So far, these are localhost domains, and the functionality for this has been ensured.

For passwords in the backend, they are encrypted using _"bcrypt"_ which are stored on the server. The password is then compared to the password entered by the user after it's decrypted. We use bcrypt instead of md5 because md5 has been decrypted in many servers and is thus unsafe.

Regarding controllers, queries check if the user is logged in and also return responses regarding this. This response is used by the front end to determine what should happen, which is usually a redirect onto the login page.




