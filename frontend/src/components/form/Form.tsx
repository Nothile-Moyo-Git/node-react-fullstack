/**
 * 
 * Date created: 25/02/2024
 * Author: Nothile Moyo
 * 
 * Form wrapper component
 * This component wraps the form in a responsive manner, and applies the appropriate styling to it
 * 
 */

import { FC, FormEvent, ReactNode } from "react";

import "./Form.scss";

/**
 * @name Form
 * 
 * @description A "Form" wrapper component, use this isntead of a regular form
 */

interface ComponentProps {
    size ?: string,
    children : ReactNode,
    isFormValid ?: boolean,
    onSubmit : (event: FormEvent) => void
}

/**
 * @name Form
 * 
 * @description Form component, serves as a wrapper for forms with the styling and error handling
 * 
 * @param children : ReactNode
 * @param isFormValid ?: boolean
 * @param onSubmit : (event: FormEvent) => void
 */
const Form : FC<ComponentProps> = ({size, children, isFormValid, onSubmit}) => {

    console.log("size");
    console.log(size);

    return(
        <form className={`form ${isFormValid === false && 'form__error'}`} onSubmit={onSubmit}>
            {children}
        </form>
    );
};

export default Form;