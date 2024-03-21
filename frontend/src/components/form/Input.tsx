/**
 * Date created : 24/02/2024
 * Author : Nothile Moyo
 * 
 * Input component
 * 
 * This component is designed to be a re-usable label component for forms
 * Props passed through to this component will represent the HTML properties of the element
 */

import "./Input.scss";

import React, { ReactNode, forwardRef } from "react";

interface ComponentProps {
    ariaLabelledBy : string,
    children ?: ReactNode,
    error : boolean,
    name : string,
    placeholder : string,
    ref : React.RefObject<HTMLInputElement>,
    required ?: boolean
    type : string,
};

export const Input = forwardRef<HTMLInputElement, ComponentProps>(function InputComponent(props, ref) {

    return(
        <input
            aria-labelledby={props.ariaLabelledBy}
            className={`input ${props.error === true && 'input__error'}`}
            name={props.name}
            placeholder={props.placeholder}
            ref={ref}
            type={props.type}
            required={props.required}
        />
    );
});

export default Input;