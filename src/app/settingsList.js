import React, {Fragment, useContext} from "react";
import {AuthorSettingContext, DateSettingContext, HideSettingContext} from "./settingsContext";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

let SettingsList = () => {
    const {author, setAuthor} = useContext(AuthorSettingContext);
    const {date, setDate} = useContext(DateSettingContext);
    const {hide, setHide} = useContext(HideSettingContext);

    const settingsOptions = [
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
                list: ["artist name", "summary", "date", "object history"],
                current: hide
            },
            clickFunction: setHide
        }
    ];

    return settingsOptions.map(object => {
        const key = generateUniqueID();

        const {
            option,
            value : {
                list : valuesList,
                current : currentValue
            },
            clickFunction
        } = object;

        const valuesRowLayout = valuesList.map((value, index) => {
            const columnId = generateUniqueID();

            const clickHandler = () => {
                if (currentValue === value)
                    clickFunction('');
                else
                    clickFunction(value);
            };

            return (<Fragment key={columnId}>
                {index === 2 &&
                <div className="col-md-3 d-none d-sm-block">

                </div>}

                <div className='col'>
                    <button
                        type="button"
                        className={`btn border rounded-0 w-100 ${currentValue === value ? 'btn-dark' : 'btn-light text-primary'}`}
                        onClick={clickHandler}
                    >
                        {value}
                    </button>
                </div>
            </Fragment>);
        });

        return <div
            className="row row-cols-1 row-cols-sm-3 gy-3
            mb-3 justify-content-sm-center justify-content-md-start"
            key={key}>
            <div className="col col-md-3 text-center text-sm-left">{option}</div>

            {valuesRowLayout}
        </div>;
    });
}

export default SettingsList;