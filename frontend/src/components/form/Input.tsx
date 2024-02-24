/**
 * Date created : 24/02/2024
 * Author : Nothile Moyo
 * 
 * Input component
 * 
 * This component is designed to be a re-usable label component for forms
 * Props passed through to this component will represent the HTML properties of the element
 */

import React, { FC, ReactNode } from "react";

interface ComponentProps {
    ariaLabelledBy : string,
    children ?: ReactNode,
    name : string,
    placeholder : string,
    ref : React.RefObject<HTMLInputElement>,
    type : string,

};

const Input : FC<ComponentProps> = ({ ariaLabelledBy, children, name, placeholder, ref, type }) => {

    return (
        <input
            aria-labelledby={ariaLabelledBy}
            name={name}
            placeholder={placeholder}
            ref={ref}
            type={type}
        />
    );
};

export default Input;