/**
 * Date created: 29/04/2024
 * 
 * Author: Nothile Moyo
 * 
 * Select component, incoorperates the styling that is required for a select component
 * This will have variants, one that is currently used for pagination and another that is used for form inputs
 * 
 * @param pages ?: number[] -> An array of numbers starting from 1 which are iterated through for options
 */

import { forwardRef } from "react";

interface ComponentProps {
    pages ?: number[] | undefined,
    options ?: string[],
    ref : React.RefObject<HTMLSelectElement>
}

export const Select = forwardRef<HTMLSelectElement, ComponentProps>(function SelectComponent(props, ref) {

    return(
        <select>
            { 
                props.pages && props.pages.length > 0 && props.options === undefined && props.pages.map((page : number) => {
                    return (<option value={page}></option>);
                })
            }
        </select>
    );
});