# Nothile's full stack Application

## Front End Documentation
**Welcome :)**

This is the front end documentation for the application. You can find more in depth information about the front end here. Please view the rest of the README below on information on the tech stack, and working with the codebase.

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
