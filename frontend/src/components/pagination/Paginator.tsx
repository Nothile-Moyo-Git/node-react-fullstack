/**
 * Date created : 26/04/2024
 * 
 * Author : Nothile Moyo
 * 
 * Paginator component
 * Manages pagination (typically) for a list on a page
 */

import { Link } from "react-router-dom";
import "./Paginator.scss";
import { FC, useState, useEffect } from "react";
import { BASENAME } from "../../util/util";

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

    const updatePage = (page : number) => {
        console.log("Page updated");
        console.log("\n\n");
        console.log(page);
        setPage(page);
    };




    return (
        <div className="paginator">
            {
                previousPages[0] > 1 &&
                <div className="paginator__min-max-wrapper">
                    <Link
                        to={`${BASENAME}/posts/1`}
                        className="paginator__button"
                        onClick={() => { updatePage(1) }}
                    >1</Link>
                    <p className="paginator__min-max-text">...</p>
                </div>
            }

            {
                previousPages.length > 0 &&
                previousPages.map((pageNumber : number) => 
                    <Link 
                        to={`${BASENAME}/posts/${pageNumber}`}
                        className="paginator__button"
                        onClick={() => { updatePage(pageNumber) }}
                    >
                        {pageNumber}      
                    </Link>
                )
            }

            <button className="paginator__button paginator__button--current">{currentPage}</button>

            {
                upcomingPages.length > 0 &&
                upcomingPages.map((pageNumber : number) => 
                    <Link
                        to={`${BASENAME}/posts/${pageNumber}`}
                        className="paginator__button"
                        onClick={() => { updatePage(pageNumber) }}
                    >
                        {pageNumber} 
                    </Link>
                )
            }

            {
                upcomingPages[1] < numberOfPages &&
                <div className="paginator__min-max-wrapper">
                    <p className="paginator__min-max-text">...</p>
                    <Link
                        to={`${BASENAME}/posts/${numberOfPages}`}
                        className="paginator__button"
                        onClick={() => { updatePage(numberOfPages) }}
                    >{numberOfPages}</Link>
                </div>
            }

        </div>
    );
};