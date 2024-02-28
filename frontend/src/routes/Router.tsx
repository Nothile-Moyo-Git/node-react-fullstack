/**
 * 
 * Date created: 12/02/2024
 * 
 * Author : Nothile Moyo
 * 
 * This file handles the routing for the application
 * Note: when using the basename, in your local server, navigate to the URL
 */

import { LoginPage } from '../pages/Auth/Login';
import { SignupPage } from '../pages/Auth/Signup';
import PageWrapper from '../components/globals/PageWrapper';
import App from '../App';

import { 
    createBrowserRouter,
} from 'react-router-dom';

const BASENAME = '/typescript-fullstack'

export const nestedRouter = createBrowserRouter([
    {
        path : "/",
        element: <PageWrapper/>,
        children : [
            {
                path : BASENAME,
                element : <App/>
            },
            {
                path : BASENAME + "/login",
                element : <LoginPage/>
            },
            {
                path : BASENAME + "/signup",
                element : <SignupPage/>
            }
        ]
    }
]);