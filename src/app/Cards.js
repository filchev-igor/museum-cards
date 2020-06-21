import React from 'react';
import Card from "./Card";

let Cards = (props) => {
    let setCardRef = (reference) => {
        props.onSetCardRef(reference);
    };

    const {
        defaultImageLink,
        data
    } = props;

    const cards = Object.values(data).map( cardData =>
        <Card
            onSetCardRef = { setCardRef }
            key={ cardData['imageId'] }
            data={ cardData }
            defaultImageLink={defaultImageLink}
        />
    );

    return <div className='w-50 mx-auto'>{ cards }</div>;
};

export default Cards;