/**
 * Date created : 24/02/2024
 * 
 * Author: Nothile Moyo
 * 
 * Page wrapper component
 * This component serves as the page wrapper which will cover simple things such as background styling and scroll wheels
 * 
 */

import { Outlet } from "react-router-dom";
import { FC, useState, ReactNode, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext"; 
import Menu from "../menu/Menu";
import "./PageWrapper.scss";

interface ComponentProps {
    children ?: ReactNode
}

const PageWrapper : FC<ComponentProps> = ({children}) => {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    // Get the method from the backend to query
    const appContextInstance = useContext(AppContext);

    // Query the backend to see if we're logged in
    useEffect(() => {

        const fetchAuthentication = async () => {

            try {

                appContextInstance?.validateAuthentication();
                setIsLoggedIn(appContextInstance?.token !== "");
                
            }catch(error){

                console.log("Request failed");
                console.log(error);
            }
        };

        fetchAuthentication();

    },[appContextInstance]);

    // Set our menuInfo object, we don't need state here as we don't need this to trigger a re-render
    const menuInfo = { isMenuOpen : isMenuOpen, isLoggedIn : isLoggedIn };
    let menuStyle = 'menu-closed menu-closed__logged-out';

    // Set the menu info so we can account for whether the menu is open, closed and also login states
    switch(true) {

        case menuInfo.isMenuOpen && menuInfo.isLoggedIn :
            menuStyle = 'menu-open menu-open__logged-in';
            break;
        
        case menuInfo.isMenuOpen && !menuInfo.isLoggedIn : 
            menuStyle = 'menu-open menu-open__logged-out';
            break;

        case !menuInfo.isMenuOpen && menuInfo.isLoggedIn :
            menuStyle = 'menu-closed menu-closed__logged-in';
            break;
        
        case !menuInfo.isMenuOpen && !menuInfo.isLoggedIn :
            menuStyle = 'menu-closed menu-closed__logged-out';
            break;
        
        default : 
            menuStyle = 'menu-closed menu-closed__logged-out';
            break;
    }

    return (
        <main className={menuStyle}>
            <Menu 
                isMenuOpen={isMenuOpen}
                toggleMenu={setIsMenuOpen}
            />
            {children}
            <Outlet />
        </main>
    );
};

export default PageWrapper;