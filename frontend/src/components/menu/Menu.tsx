/**
 * 
 * Date created: 12/02/2024
 * 
 * Author : Nothile Moyo
 * 
 * Menu component
 * This is the main menu which will render at the top of every page which has the menu
 */

import React, { FC, ReactNode, useContext, useEffect } from "react";
import Button from "../button/Button";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { BASENAME } from "../../util/util";
import "./Menu.scss";

interface ComponentProps {
    children ?: ReactNode,
    isMenuOpen : boolean,
    toggleMenu : React.Dispatch<React.SetStateAction<boolean>> 
}

const Menu : FC<ComponentProps> = ({ isMenuOpen, toggleMenu }) => {

    const navigate = useNavigate();

    // Get the auth state
    const appContextInstance = useContext(AppContext);

    // Toggle the menu and the icon to show or hide it
    const handleToggleMenu = () => {
        toggleMenu((previousState : boolean) => { return !previousState; });
    };

    const handleLogoutUser = () => {
 
        // Log the user out of the session
        appContextInstance?.logoutUser();

        // Redirect to the login page
        navigate(`${BASENAME}/login`);
    };

    // Check authentication when component mounts
    useEffect(() => {
        appContextInstance?.validateAuthentication();
    },[appContextInstance]);

    return(
        <header>

            <nav>
                <ul className="menu">
                    
                    <li className="menu__item">
                        <Link to={BASENAME} className="menu__link">Home</Link>
                    </li>

                    {
                        appContextInstance?.userAuthenticated === false &&
                        <>

                            <li className="menu__item">
                                <Link to={BASENAME + "/login"} className="menu__link">Login</Link>
                            </li>

                            <li className="menu__item">
                                <Link to={BASENAME + "/signup"} className="menu__link">Signup</Link>
                            </li>

                        </>
                    }

                    {
                        appContextInstance?.userAuthenticated === true &&
                        <>
                            <li className="menu__item">
                                <Link to={BASENAME + "/posts/1"} className="menu__link">Posts</Link>
                            </li>

                            <li className="menu__item">
                                <Link to={BASENAME + "/post/create"} className="menu__link">Create Post</Link>
                            </li>
                            
                            <li className="menu__item">
                                <Button variant="menu" onClick={handleLogoutUser}>Logout</Button>
                            </li>
                        </>
                    }

                </ul>
            </nav>

            {
                !isMenuOpen &&
                <div className="toggle-menu-button" id="show_menu" onClick={handleToggleMenu}>
                    <svg viewBox="0 0 100 80" width="25" height="30">
                        <rect width="100" height="10" fill="#FFFFFF"></rect>
                        <rect y="30" width="100" height="10" fill="#FFFFFF"></rect>
                        <rect y="60" width="100" height="10" fill="#FFFFFF"></rect>
                    </svg>
                </div>
            }

            {   
                isMenuOpen && 
                <div className="toggle-menu-button toggle-menu-button__show" id="hide_menu" onClick={handleToggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="25px" width="25px" version="1.1" id="Capa_1" viewBox="0 0 490 490">
                        <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 "/>
                    </svg>
                </div>
            }

        </header>
    );
};

export default Menu;