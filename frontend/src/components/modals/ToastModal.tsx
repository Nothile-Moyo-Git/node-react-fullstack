/**
 * 
 * Date created : 24/06/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description : A simple toast notification modal
 */

import { FC, useState, useEffect } from "react";

interface ComponentProps {
    variant ?: string
};

const ToastModal : FC<ComponentProps> = ({
    variant = "info"
}) => {

    // Variables to set state
    const [toastStyles, setToastStyles] = useState<string>();

    // We set the styling and icons based on the variant
    useEffect(() => {

        switch(variant){

            case "success" :
                setToastStyles("toast--success");
                break;

            case "info" : 
                setToastStyles("toast--info");
                break;
            
            default :
                setToastStyles("toast--info");
        }

    },[]);

    return(
        <div className={`toast ${toastStyles}`}>
            Toast
        </div>
    );
};

export default ToastModal;
