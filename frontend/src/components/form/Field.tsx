/**
 * 
 * Date created: 26/02/2024
 * Author: Nothile Moyo
 * 
 * Field component, this component wraps a field in any forms that we have
 * The field component has custom styling attached to it
 */

import "./Field.scss";

import { FC, ReactNode } from "react";

interface ComponentProps {
    children : ReactNode
}

const Field : FC<ComponentProps> = ({children}) => {

    return(
        <div className="field">
            {children}
        </div>
    );
};

export default Field;

