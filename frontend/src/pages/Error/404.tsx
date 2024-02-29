/**
 * Date created: 28/02/2024
 * 
 * Author: Nothile Moyo
 * 
 * The error page component
 * This component renders a 404 page as a fallback if the route can't be handled
 */

import { FC } from "react";
import { NavLink } from "react-router-dom";
import { BASENAME } from "../../util/util";

import "./404.scss";

export const ErrorPage : FC = () => {

    return(
        <section className="error">
            <h1>Error: 404 Page not found</h1>
            <p>Go to the <NavLink to={BASENAME}>home</NavLink> page</p>
        </section>
    );
};