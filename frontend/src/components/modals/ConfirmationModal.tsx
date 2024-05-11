/**
 * 
 * Date created : 11/05/2024
 * 
 * Author : Nothile Moyo
 * 
 * Confirmation Modal component
 * This component is a confirmation modal which renders in the middle of the page
 * The component will take an onclick handler for the previous function, and have a cancel button
 * This component will be used for things such as deleting a post etc...
*/

import { FC } from "react";
import Button from "../button/Button";

interface ComponentProps {
    toggleConfirmationModal ?: (event : React.MouseEvent<HTMLElement>) => void
    performAction ?: (event : React.MouseEvent<HTMLElement>) => void
}

/**
 * @name ConfirmationModal
 * 
 * @param toggleConfirmationModal ?: (event : React.MouseEvent<HTMLElement>) => void
 * @param performAction ?: (event : React.MouseEvent<HTMLElement>) => void
 * 
 * @returns ConfirmationModal : Jsx
 */
const ConfirmationModal : FC<ComponentProps> = ({ toggleConfirmationModal, performAction }) => {

    return(
        <section>
            <h2>Are you sure?</h2>
            <p>If you wish to complete this action, click on the confirm button. If you'd like to cancel, click on cancel</p>
            <p>Please know that this action is NOT REVERSABLE</p>
            <div>
                <Button variant="primary" onClick={performAction}>Confirm</Button>
                <Button variant="delete" onClick={toggleConfirmationModal}>Cancel</Button>
            </div>
        </section>
    );
};

export default ConfirmationModal;