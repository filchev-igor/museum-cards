import React, {useContext, useEffect, useRef} from 'react';
import {
    AuthorContext, DateContext, HideContext, CardRefContext, DefaultImageLinkContext
} from "./settings-contexts";

let CardText = (props) => {
    let {
        designator,
        text
    } = props;

    if (designator !== undefined)
        designator = `${designator}: `;
    else
        designator = "";

    return (
        <>
            <span className='card-text'>{ designator }{ text }</span>
            <br/>
        </>
    )
};

let Card = (props) => {
    const authorContext = useContext(AuthorContext);
    const dateContext = useContext(DateContext);
    const hideContext = useContext(HideContext);
    const {ref, setRef} = useContext(CardRefContext);
    const defaultImageLink = useContext(DefaultImageLinkContext);

    const imageRef = useRef(null);

    const {
        artist,
        date,
        description,
        historyNote,
        imageId,
        place
    } = props.data;

    useEffect(() => {
        if (imageId !== "") {
            ref.push(imageRef.current);
            setRef(ref);
        }
    });

    let text;

    if (historyNote !== '')
        text = <CardText text={ historyNote } />;
    else if (description !== '')
        text = <CardText text={ description } />;

    let artistName = artist['name'];

    let cardTextTop = artistName;

    if (typeof artistName === "undefined")
        cardTextTop = 'Unknown artist';

    let artistBirthDate = artist['birth_date'];
    let artistDeathDate = artist['death_date'];

    if (artistBirthDate !== '' && artistBirthDate !== undefined)
        cardTextTop += ` (${artistBirthDate}`;

    if (artistDeathDate !== '' && artistDeathDate !== undefined)
        cardTextTop += ` - ${artistDeathDate})`;
    else if (artistBirthDate !== '' && artistBirthDate !== undefined)
        cardTextTop += ")";

    let directory = imageId.slice(0, 6);
    let urlToImage = 'http://media.vam.ac.uk/media/thira/collection_images';

    urlToImage = `${urlToImage}/${directory}/${imageId}.jpg`;

    let dateText;

    if (date)
        dateText = <CardText designator="Date" text={ date }/>;

    return (
        <div className="col mb-4">
            <div className='card h-100'>
                <div className='card-header'>
                    <div className='row justify-content-between align-items-center'>
                        <div className='col'>
                            <span>{ cardTextTop }</span>
                        </div>

                        <div className='col-1 m-0 p-0'>
                            <span className="text-right oi oi-person">

                            </span>
                        </div>
                    </div>
                </div>

                <img
                    className='card-img'
                    ref={ imageRef }
                    src={ defaultImageLink }
                    data-src={ urlToImage }
                    alt=""
                />

                <div className='card-body'>
                    { text }
                    { dateText }
                    <CardText designator="Place" text={ place } />
                </div>
            </div>
        </div>
    );
};

export default Card;