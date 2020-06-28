import React, {useContext} from "react";
import {AuthorContext, DateContext, HideContext} from "./settings-contexts";

let SettingsList = () => {
    const {author, setAuthor} = useContext(AuthorContext);
    const {date, setDate} = useContext(DateContext);
    const {hide, setHide} = useContext(HideContext);

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
        const valuesList = object['value']['list'];
        const currentValue = object['value']['current'];

        const valuesRowLayout = valuesList.map((value, index) => {
            let clickFunction = object['clickFunction'];
            let clickHandler = () => {
                if (currentValue === value)
                    clickFunction(null);
                else
                    clickFunction(value);
            }

            let buttonClassName = "btn btn-light border rounded-0 text-primary w-100";

            if (currentValue === value)
                buttonClassName += " active";

            return (
                <div className="col" key={index}>
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

        let divClassName = "row row-cols-1 row-cols-md-4";

        if (objectIndex < array.length - 1)
            divClassName += " mb-3";

        return <div className={ divClassName } key={ objectIndex }>
            <div className="col">{ object['option'] }</div>

            { valuesRowLayout }
        </div>;
    });
}

export default SettingsList;