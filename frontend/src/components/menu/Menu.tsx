/**
 * 
 * Date created: 12/02/2024
 * 
 * Author : Nothile Moyo
 * 
 * Menu component
 * This is the main menu which will render at the top of every page which has the menu
 */

import { FC } from "react";
import { NavLink } from "react-router-dom";

const Menu : FC = () => {

    return(
        <nav>
            <ul>

                <li>
                    <NavLink to="/">Home</NavLink>
                </li>

                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>

                <li>
                    <NavLink to="/signup">Signup</NavLink>
                </li>

            </ul>
        </nav>
    );
};

export default Menu;