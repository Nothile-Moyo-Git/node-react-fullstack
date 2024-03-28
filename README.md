# Nothile's Full Stack Enterprise TypeScript Application

## Hello there, welcome to my TypeScript application :)

-----

### This application is designed as an exercise in being able to build a full stack application using React + Node.js + TypeScript.

**After having spent a long time working with various TypeScript technologies, I designed to put it all together. The front end is written in React + SCSS(BEM) TypeScript + Node.js. The backend is written in Node.js + TypeScript + Express + MongoDB + Mongoose.**

*I wanted to create an application when I could apply the MVC architecture to a de-coupled web application. The front end, backend and database are all handled using REST queries with CORS for security. Sessions are stored locally on the front end and queried once the app is running. The database used for this application is non-relational and an ODM which is done through Mongoose.*

-----

### Setup

The version of node used when building this application is v18.12.1 If you need to change your node version for your installation, you can use ```nvm```.

> nvm is known as "node version manager" which allows you manage your node installations to make dependency management easier. You can find it [here](https://github.com/nvm-sh/nvm).

In order to install the required packages, run ```npm run install``` followed by ```npm audit fix```. The audit fix will automatically fix any issues that can be resolved without breaking the potential build.

In order to deploy the app, run ```npm run deploy``` which will deploy it to production.

**You can view the production website [here](https://google.com)**

If you are visiting this repository and need the connection.ts file, _please send an email to [this](mailto:nothile1@gmail.com) email address._ If you know me personally, send a message requesting it.

You can copy the required commands from below

> Install node v18.12
```
nvm install 18.12
```

> Use node v18.12
```
nvm use 18.12
```

> Install dependencies
```
npm install
```

> Automatically fix dependency issues
```
npm audit fix
```

> Deploy the application
```
npm run deploy
```

> Start local server (this starts both the front and backend concurrently)
```
npm run application
```

-----

### Frontend

**Note: Please read the "README.md" file found in "frontend/README.md" for in depth information on the front end**

### Backend 

**Note: Please read the "README.md" file found in "backend/README.md" for in depth information on the front end**

-----

### Development process

- Duplicate the development branch by creating a feature or bugfix branch [Click here to see how to create your branch](https://www.gitkraken.com/learn/git/git-flow)
- Complete your work **Note: Please lint and test your code**
- Create your pull request by going [here](https://github.com/Nothile-Moyo-Git/express-routing-demo/compare) and comparing your branch to *"develop"*
- I will receive an email that a PR has been raised. Once this is the case, I will review the code and merge it into develop if I approve it.

-----

### Potential improvements

> Security improvements

[Api requests best practices](https://curity.io/resources/learn/api-security-best-practices/)

> Optimizing queries

[Optimize performance for MongoDB queries](https://medium.com/globant/mongodb-mongoose-query-optimizations-63cfc6def9d9)

> Link for SOLID is here, it's about figuring out superior ways to use our Models, properties and methods with the appropriate naming conventions.

[Solid Principles](https://www.freecodecamp.org/news/solid-principles-explained-in-plain-english/)

-----

### Overall thoughts
Although this application serves as a glorified to-do list. The technical approach to it showcases a lot of various skills implemented in order to make the application as scalable as possible. Although it may not have every single feature from every single application I've built thus far, I'm still plenty impressed with it :)
