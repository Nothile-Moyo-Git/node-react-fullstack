/**
 * 
 * Date created: 12/02/2024
 * 
 * Author : Nothile Moyo
 * 
 * This file handles the routing for the application
 * Note: when using the basename, in your local server, navigate to the URL
 */

import { ErrorPage } from '../pages/Error/404';
import { LoginPage } from '../pages/Auth/Login';
import { SignupPage } from '../pages/Auth/Signup';
import PageWrapper from '../components/globals/PageWrapper';
import { BASENAME } from '../util/util';
import App from '../App';

import { 
    createBrowserRouter,
} from 'react-router-dom';

export const nestedRouter = createBrowserRouter([
    {
        path : "/",
        element: <PageWrapper/>,
        errorElement: <ErrorPage/>,
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