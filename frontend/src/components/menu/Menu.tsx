/**
 * 
 * Date created: 12/02/2024
 * 
 * Author : Nothile Moyo
 * 
 * Menu component
 * This is the main menu which will render at the top of every page which has the menu
 */

import React, { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { BASENAME } from "../../util/util";
import "./Menu.scss";

interface ComponentProps {
    children ?: ReactNode,
    toggleMenu : React.Dispatch<React.SetStateAction<boolean>> 
}

const Menu : FC<ComponentProps> = ({ toggleMenu }) => {

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

            <div className="toggle-menu-button" id="show_menu">
                <svg viewBox="0 0 100 80" width="25" height="30">
                    <rect width="100" height="10" fill="#FFFFFF"></rect>
                    <rect y="30" width="100" height="10" fill="#FFFFFF"></rect>
                    <rect y="60" width="100" height="10" fill="#FFFFFF"></rect>
                </svg>
            </div>

            <div className="toggle-menu-button toggle-menu-button__show" id="hide_menu">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="25px" width="25px" version="1.1" id="Capa_1" viewBox="0 0 490 490">
                    <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 "/>
                </svg>
            </div>

        </nav>
    );
};

export default Menu;