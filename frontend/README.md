# Nothile's full stack Application

## Front End Documentation
**Welcome :)**

This is the front end documentation for the application. You can find more in depth information about the front end here. Please view the rest of the README below on information on the tech stack, and working with the codebase.

-----

### Tech Stack
The current technology stack for the front end is:

- React. React is used for the front end due to its increased interactivity with the end user, good performance and a strong ecosystem to support it. React also presents all the advantages of function based components.
> [React](https://react.dev/learn/typescript)
**NOTE:** You can install react by using the following script: ```npm install @types/react @types/react-dom```

- Typescript. We use TypeScript as a transpiler because TypeScript allows us to write less buggy, more readable code. It significantly reduces runtime errors by flagging them up during development.
> [TypeScript](https://www.typescriptlang.org/)

- SCSS. Described further below.
> [SCSS](https://sass-lang.com/)

- React Router. We use this in order to handle our routes in the front end. We also use this to render our views.
> [React Router](https://reactrouter.com/en/main)

- Socket IO. This is used for any dynamic web chats in the near future.
> [Socket IO](https://socket.io/)

-----

### Request handling
The backend uses [multer](https://www.npmjs.com/package/multer) to parse requests. 

In order to get this to work with React forms, you must use _"multipart/form-data"_ for requests.

You can copy the value here, this should be your _"Content-Type"_ value.
> "multipart/form-data"

------

### Styling
This app uses SCSS with BEM.
> You can visit the SCSS website [here](https://sass-lang.com/)

BEM refers to "block", "element", "modifier". The block refers to the section of code you're doing. This could be a linked list, a custom web component, or a form.

The element refers to an element within the block. You'll notice that these element styles have the _"&__"_ prefix. 

The modifier refers to a style which is applied when you want a different styling "state". This could be an error mode for example, or a success mode which turns inputs green.

You visit the BEM website [here](https://getbem.com/) to find out more.

The _"scss"_ folder contains partials which can be referenced in any other stylesheet.
