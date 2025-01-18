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
  ariaLabelledBy?: string;
  children?: ReactNode;
  error: boolean;
  initialValue?: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  ref: React.RefObject<HTMLInputElement>;
  required?: boolean;
  square?: boolean;
  type: string;
}

/**
 * @Name Input
 *
 * @Description Reusable Input component accounting for different input types
 *
 * @param aria-labelledBy : string
 * @param children ?: ReactNode
 * @param defaultValue : string
 * @param error : boolean
 * @param initialV  alue ?: string
 * @param name : string
 * @param onChange ?: (event : React.ChangeEvent<HTMLInputElement>) => void
 * @param placeholder ?: string
 * @param ref : React.RefObject<HTMLInputElement>
 * @param required ?: boolean
 * @param square ?: boolean
 * @param type : string
 */
const Input = forwardRef<HTMLInputElement, ComponentProps>(
  function InputComponent(props, ref) {
    // Set the classNames for the input
    const inputClassNames = props.square ? "input__square" : "";

    return (
      <input
        aria-labelledby={props.ariaLabelledBy}
        className={`input ${inputClassNames} ${props.error === true && "input__error"}`}
        defaultValue={props.initialValue}
        name={props.name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.onChange && props.onChange(event);
        }}
        placeholder={props.placeholder}
        ref={ref}
        type={props.type}
        required={props.required}
      />
    );
  },
);

export default Input;
