/**
 * Date created : 26/04/2024
 * 
 * Author : Nothile Moyo
 * 
 * Paginator component
 * Manages pagination (typically) for a list on a page
 */

import "./Paginator.scss";
import { FC, useState, useEffect } from "react";

interface ComponentProps {
    numberOfPages : number
    currentPage : number,
    setPage : React.Dispatch<React.SetStateAction<number>>
}

export const Paginator : FC<ComponentProps> = ({ numberOfPages, currentPage = 1, setPage }) => {

    const [previousPages, setPreviousPages] = useState<number[]>([]);
    const [upcomingPages, setUpcomingPages] = useState<number[]>([]);

    useEffect(() => {

        // Calculate the previous pages based on whether they can exist, this goes up to 2
        const tempPrevPages = [];
        currentPage - 1 >= 1 && tempPrevPages.unshift(currentPage - 1);
        currentPage - 2 >= 1 && tempPrevPages.unshift(currentPage - 2);
        setPreviousPages(tempPrevPages);

        // Calculate the upcoming pages based on whether they can exist. This also goes up to 2.
        const tempUpcomingPages = [];
        currentPage + 1 <= numberOfPages && tempUpcomingPages.push(currentPage + 1);
        currentPage + 2 <= numberOfPages && tempUpcomingPages.push(currentPage + 2);
        setUpcomingPages(tempUpcomingPages);


    },[currentPage, numberOfPages]);

    return (
        <div className="paginator">
            <button className="paginator__button paginator__button--current">{currentPage}</button>
        </div>
    );
};