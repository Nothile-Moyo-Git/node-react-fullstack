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
import { BASENAME } from "../../util/util";
import "./Menu.scss";

const Menu : FC = () => {

    return(
        <nav>
            <ul className="menu">

                <li className="menu__item">
                    <NavLink to={BASENAME} className="menu__link">Home</NavLink>
                </li>

                <li className="menu__item">
                    <NavLink to={BASENAME + "/login"} className="menu__link">Login</NavLink>
                </li>

                <li className="menu__item">
                    <NavLink to={BASENAME + "/signup"} className="menu__link">Signup</NavLink>
                </li>

            </ul>
        </nav>
    );
};

export default Menu;