import "../App.css";
import React from "react";

const CardSection = ({left : leftColumn, right : rightColumn, hasBorder = true}) => {
    return (<>
        <div
            className={`col text-uppercase fs-5 ${hasBorder ? "mb-2 border-bottom border-1 border-dashed" : ''}`}>
            {leftColumn}
        </div>

        <div
            className={`col align-self-end fw-light ${hasBorder ? "mb-2 border-bottom border-1 border-dashed" : ''}`}>
            {rightColumn}
        </div>
    </>);
};

export default CardSection;