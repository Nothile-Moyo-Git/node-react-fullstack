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
import App from '../App';

import { 
    createBrowserRouter, 
    createRoutesFromElements, 
    Route
} from 'react-router-dom';

const BASENAME = '/typescript-fullstack'

// Set our routes so we can also set our basename in browser router
const routes = createRoutesFromElements(
    <Route>
        <Route path="/" element={<App/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="*" element={<App/>}/>
    </Route>
);

// We create the router here but we're not creating a component
export const router = createBrowserRouter(
    routes,
    { basename : BASENAME }
);