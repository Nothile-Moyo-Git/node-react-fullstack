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

    // Get the method from the backend to query
    const appContextInstance = useContext(AppContext);

    // Query the backend to see if we're logged in
    useEffect(() => {

        const fetchAuthentication = async () => {

            try {

                appContextInstance?.validateAuthentication();
                
            }catch(error){

                console.log("Request failed");
                console.log(error);
            }
        };

        fetchAuthentication();

    },[appContextInstance]);

    return (
        <main className={isMenuOpen ? 'menu-open' : 'menu-closed'}>
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