/**
 * 
 * Date created: 24/03/2024
 * Author: Nothile Moyo
 * 
 * Label component
 * 
 * This component is designed to be a re-usable label component for forms
 * Props passed through to this component will represent the HTML properties of the element
 */

import { FC, ReactNode } from "react";

interface ComponentProps {
    children : ReactNode,
    htmlFor : string,
    id : string,
};

/**
 * @method Label
 * @description Label component. Use this component instead of a label when building forms
 * 
 * @params children : ReactNode, htmlFor : string, id : string
 */
const Label : FC<ComponentProps> = ({children, id, htmlFor}) => {

    return(
        <label id={id} htmlFor={htmlFor}>
            {children}
        </label>
    );
};

export default Label;