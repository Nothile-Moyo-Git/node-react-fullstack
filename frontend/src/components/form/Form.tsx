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
    children: ReactNode,
    isFormValid ?: boolean,
    onSubmit: (event: FormEvent) => void
}

const Form : FC<ComponentProps> = ({children, isFormValid, onSubmit}) => {

    return(
        <form className={`form ${isFormValid === false && 'form__error'}`} onSubmit={onSubmit}>
            {children}
        </form>
    );
};

export default Form;