/**
 * 
 * Date created: 04/04/2024
 * 
 * Author: Nothile Moyo
 * 
 * License : MIT
 * 
 * This is the image preview component
 * The component takes a b64 encoded image and renders it on the form 
 */

import { FC } from "react";
import "./ImagePreview.scss";

interface ComponentProps {
    encodedImage : unknown | null,
    backgroundSize ?: string,
    backgroundPosition ?: string
};

const ImagePreview : FC<ComponentProps> = ({ encodedImage, backgroundSize, backgroundPosition }) => {

    return(
        <div
            className="imagePreview"
            style={{
                backgroundImage : `url('${encodedImage}')`,
                backgroundSize : backgroundSize ? backgroundSize : 'cover',
                backgroundPosition : backgroundPosition ? backgroundPosition : 'center'
            }}
        />
    );
};

export default ImagePreview;