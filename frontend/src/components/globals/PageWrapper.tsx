/**
 * Date created : 24/02/2024
 * 
 * Author: Nothile Moyo
 * 
 * Page wrapper component
 * This component serves as the page wrapper which will cover simple things such as background styling and scroll wheels
 * 
 */

import { Link, Outlet } from "react-router-dom";
import { FC, useState, ReactNode, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext"; 
import Menu from "../menu/Menu";
import "./PageWrapper.scss";
import chatIcon from "../icons/chat-icon.svg";
import { BASENAME } from "../../util/util";

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

            <Link
                to={`${BASENAME}/chat`}
                className="footer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" fill="none">
                    <path d="M8 10.5H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M8 14H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
            </Link>
        </main>
    );
};

export default PageWrapper;