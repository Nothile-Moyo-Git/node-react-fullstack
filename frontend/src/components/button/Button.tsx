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
    variant ?: string,
    onClick ?: (event : MouseEvent) => void
};

/**
 * @name "Button" Component
 * @description A reusable button component, please use this instead of the vanilla button element in HTML
 * 
 * @param children : ReactNode -> Text
 * @param onClick : () => void -> Executes event handlers
 * @param variant : string -> Variant of the button. Use "primary" if you're in doubt. You also have the options "secondary" and "menu".
 * 
 * @returns Button : FC<ComponentProps>
 */
const Button : FC<ComponentProps> = ({children, variant, onClick}) => {

    let variantClassName = "";

    // Implement styling for the variant
    switch(variant){

        case "primary":
            variantClassName = "button__primary";
            break;
        
        case "secondary":
            variantClassName = "button__secondary";
            break;

        case "menu":
            variantClassName = "button__menu";
            break;

        case "error":
            variantClassName = "button__error";
            break;
        
        default:
            variantClassName = "";
            break;
    }

    return(
        <button className={`button ${variantClassName}`} onClick={onClick}>{children}</button>
    );
};

export default Button;
