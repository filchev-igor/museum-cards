import React, {useContext} from 'react';
import Card from "./Card";
import {HideContext} from "./settings-contexts";

let Cards = (props) => {
    const {hide} = useContext(HideContext);

    const { data } = props;

    const cards = Object.values(data).map(cardData => {
        const {
            artist,
            date,
            description,
            historyNote
        } = cardData;

        if (hide === "description") {
            if (historyNote === '' || description === '') {
                return null;
            }
        }
        else if (hide === "date") {
            if (!date)
                return null;
        }
        else if (hide === "authors name") {

            if (typeof artist['name'] === "undefined")
                return null;
        }

        return <Card
            key={cardData['imageId']}
            data={cardData}
        />
    });

    return (
        <div className="row row-cols-1 row-cols-md-3">
            { cards }
        </div>
    );
};

export default Cards;