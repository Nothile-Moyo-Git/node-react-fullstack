/**
 * 
 * Date created : 24/06/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description : A simple toast notification modal
 */

import { FC, useState, useEffect, ReactElement } from "react";
import { SiTicktick } from "react-icons/si";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaCircleExclamation } from "react-icons/fa6";
import "./ToastModal.scss";

interface ComponentProps {
    variant ?: string,
    customMessage ?: string
};

const ToastModal : FC<ComponentProps> = ({
    variant = "info",
    customMessage
}) => {

    // Variables to set state
    const [toastStyles, setToastStyles] = useState<string>(``);
    const [defaultToastMessage, setDefaultToastMessage] = useState<string>(`Your request has been processed`);
    const [icon, setIcon] = useState<ReactElement>(<IoMdInformationCircleOutline/>);

    // We set the styling and icons based on the variant
    useEffect(() => {

        switch(variant){

            case "success" :
                setToastStyles("toast--success");
                setDefaultToastMessage(`Your request has been successful`);
                setIcon(<SiTicktick/>);
                break;

            case "post added" :
                setToastStyles("toast--info");
                setDefaultToastMessage(`New post has been added`);
                setIcon(<IoMdInformationCircleOutline/>);
                break;

            case "info" : 
                setToastStyles("toast--info");
                setDefaultToastMessage(`Your request has been processed`);
                setIcon(<IoMdInformationCircleOutline/>);
                break;

            case "error" : 
                setToastStyles("toast--error");
                setDefaultToastMessage(`There has been an error with your request`);
                setIcon(<FaCircleExclamation/>);
                break;
            
            default :
                setToastStyles("toast--info");
                setDefaultToastMessage(`Your request has been processed`);
                setIcon(<IoMdInformationCircleOutline/>);
                break;

        }
    },[variant]);

    return(
        <div className={`toast ${toastStyles}`}>
            {icon}
            {
                customMessage ?
                customMessage :
                defaultToastMessage
            }
        </div>
    );
};

export default ToastModal;
