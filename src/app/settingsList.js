import React, {useContext} from "react";
import {AuthorSettingContext, DateSettingContext, HideSettingContext} from "./settingsContext";

let SettingsList = () => {
    const {author, setAuthor} = useContext(AuthorSettingContext);
    const {date, setDate} = useContext(DateSettingContext);
    const {hide, setHide} = useContext(HideSettingContext);

    let settingsOptions = [
        {
            option: "Sort by author name",
            value: {
                list: ["ascending", "descending"],
                current: author
            },
            clickFunction: setAuthor
        },
        {
            option: "Sort by date",
            value: {
                list: ["ascending", "descending"],
                current: date
            },
            clickFunction: setDate
        },
        {
            option: "Hide cards without",
            value: {
                list: ["description", "date", "authors name"],
                current: hide
            },
            clickFunction: setHide
        }
    ];

    return settingsOptions.map((object, objectIndex, array) => {
        const {
            option,
            value : {
                list : valuesList,
                current : currentValue
            },
            clickFunction
        } = object;

        const valuesRowLayout = valuesList.map((value, index) => {
            let clickHandler = () => {
                if (currentValue === value)
                    clickFunction(null);
                else
                    clickFunction(value);
            }

            let columnClassName = "col";

            if (index === 2)
                columnClassName += " mt-sm-3 mt-md-0";

            let buttonClassName = "btn btn-light border rounded-0 text-primary w-100";

            if (currentValue === value)
                buttonClassName += " active";

            return (
                <div className={columnClassName} key={index}>
                    <button
                        type="button"
                        className={buttonClassName}
                        onClick={clickHandler}
                    >
                        {value}
                    </button>
                </div>
            );
        });

        return <div
            className="row row-cols-1 row-cols-sm-3 row-cols-md-4
            mb-3 justify-content-sm-center justify-content-md-start"
            key={ objectIndex }>
            <div className="col col-md-3 text-center text-sm-left">{option}</div>

            { valuesRowLayout }
        </div>;
    });
}

export default SettingsList;