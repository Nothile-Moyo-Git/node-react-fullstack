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
import { FC, ReactNode } from "react";
import Menu from "../menu/Menu";
import "./PageWrapper.scss";

interface ComponentProps {
    children ?: ReactNode
}

const PageWrapper : FC<ComponentProps> = ({ children }) => {

    return (
        <main>
            <Menu/>
            <Outlet />
        </main>
    );
};

export default PageWrapper;