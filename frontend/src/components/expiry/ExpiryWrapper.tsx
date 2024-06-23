/**
 * 
 * Date created : 23/06/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description : A component which expires after a certain number of seconds such as a modal or toast component 
 */

import { FC, useEffect, useState } from "react";

interface ComponentProps {
    lengthInSeconds : number,
    renderableComponent ?: any
}

const ExpiryWrapper : FC<ComponentProps> = ({
    lengthInSeconds,
    renderableComponent
}) => {

    // Decide whether we should render the component or not
    const [shouldRender, setShouldRender] = useState<boolean>(true);
    const expiryDate = lengthInSeconds * 1000;

    // Set the timeout for the expiry date
    useEffect(() => {

        // Set the timeout so we can hide our component
        const timeoutId = setTimeout(() => {

            setShouldRender(false);

        }, expiryDate);

    },[]);

    // Determine which component we're going to render
    const componentToRender = shouldRender ? <>Expiry wrapper</> : null;

    return(
        <>Expiry Wrapper</>
    );
};

export default ExpiryWrapper;