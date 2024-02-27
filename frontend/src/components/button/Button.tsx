/**
 * 
 * Date created: 27/02/2024
 * 
 * Author: Nothile Moyo
 * 
 * Button component
 * Has the base styling and will also perform event handling if required
 */

import "./Button.scss";

import { FC, MouseEvent, ReactNode } from "react";

interface ComponentProps {
    children : ReactNode,
    onClick ?: (event : MouseEvent) => void
};

const Button : FC<ComponentProps> = ({children, onClick}) => {

    return(
        <button className="button" onClick={onClick}>{children}</button>
    );
};

export default Button;
