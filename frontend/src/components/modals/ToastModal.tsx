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
    variant : string,
    customMessage ?: string
};

const ToastModal : FC<ComponentProps> = ({
    variant = "info",
    customMessage
}) => {

    // Variables to set state
    const [toastStyles, setToastStyles] = useState<string>(``);
    const [defaultToastMessage, setDefaultToastMessage] = useState<string>(``);

    // We set the styling and icons based on the variant
    useEffect(() => {

        switch(variant){

            case "success" :
                setToastStyles("toast--success");
                setDefaultToastMessage(`Your request has been successful`);
                break;

            case "info" : 
                setToastStyles("toast--info");
                setDefaultToastMessage(`Your request has been processed`);
                break;
            
            default :
                setToastStyles("toast--info");
                setDefaultToastMessage(`Your request has been processed`);
                break;
        }

    },[]);

    return(
        <div className={`toast ${toastStyles}`}>
            {
                customMessage ?
                customMessage :
                defaultToastMessage
            }
        </div>
    );
};

export default ToastModal;
