/**
 * 
 * Date created: 26/02/2024
 * Author: Nothile Moyo
 * 
 * Title component, this component renders the title of the form
 * 
 */

import "./Title.scss";

import { FC, ReactNode } from "react";

interface ComponentProps {
    children : ReactNode
};

const Title : FC<ComponentProps> = ({children}) => {

    return(
        <h2 className="title">{children}</h2>
    );
};

export default Title;