/**
 * 
 * Date created : 24/06/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description : A simple toast notification modal
 */

import { FC, useState, useEffect, ReactNode } from "react";
import { SiTicktick } from "react-icons/si";
import { IoMdInformationCircleOutline } from "react-icons/io";
import "./ToastModal.scss";
import { IconType } from "react-icons";

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
    const [ToastIcon, setToastIcon] = useState<IconType | ReactNode>(IoMdInformationCircleOutline);

    // We set the styling and icons based on the variant
    useEffect(() => {

        switch(variant){

            case "success" :
                setToastStyles("toast--success");
                setDefaultToastMessage(`Your request has been successful`);
                setToastIcon(SiTicktick);
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
            <div>
                {<ToastIcon/>}
            </div>
            {
                customMessage ?
                customMessage :
                defaultToastMessage
            }
        </div>
    );
};

export default ToastModal;
