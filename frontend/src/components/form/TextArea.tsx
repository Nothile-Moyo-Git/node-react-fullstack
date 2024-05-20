/**
 * Date created : 04/04/2024
 * 
 * Author : Nothile Moyo
 * 
 * The TextArea component, used as a forward ref which uses the ref from the parent object
 * Default styling has been applied to the component
 * The HTML attributes of the element will be passed through
 */

import './TextArea.scss';
import React, { forwardRef } from "react";

interface ComponentProps {
    ariaLabelledBy : string,
    children ?: React.ReactNode,
    initialValue ?: string,
    error : boolean,
    name : string,
    placeholder : string,
    ref : React.RefObject<HTMLTextAreaElement>
    required : boolean,
    startingRows ?: number
};

/**
 * @name TextArea
 * 
 * @description A textarea component which uses a ref and a defaultValue property in order to render it
 * 
 * @param ariaLabelledBy : string
 * @param children ?: ReactNode
 * @param error : boolean
 * @param name : string
 * @param placeholder : string
 * @param ref : React.RefObject<HTMLTextAreaElement>
 * @param required : boolean
 * @param startingRows ?: number
 */
const TextArea = forwardRef<HTMLTextAreaElement, ComponentProps>(function TextAreaComponent(props, ref) {

    return (
        <textarea
            aria-labelledby={props.ariaLabelledBy}
            className={`textarea ${props.error === true && 'textarea__error'}`}
            defaultValue={props.initialValue}
            name={props.name}
            placeholder={props.placeholder}
            ref={ref}
            required={props.required}
            rows={props.startingRows ? props.startingRows : 3}
        />
    );
});

export default TextArea;