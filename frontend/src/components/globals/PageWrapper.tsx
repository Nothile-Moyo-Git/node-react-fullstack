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
import { FC, useState, ReactNode } from "react";
import Menu from "../menu/Menu";
import "./PageWrapper.scss";

interface ComponentProps {
    children ?: ReactNode
}

const PageWrapper : FC<ComponentProps> = ({children}) => {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);

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