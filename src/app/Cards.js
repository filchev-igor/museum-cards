import React from 'react';
import Card from "./Card";

let Cards = (props) => {
    const { data } = props;

    const cards = Object.values(data).map( cardData =>
        <Card
            key={ cardData['imageId'] }
            data={ cardData }
        />
    );

    return (
        <div className="row row-cols-1 row-cols-md-3">
            { cards }
        </div>
    );
};

export default Cards;