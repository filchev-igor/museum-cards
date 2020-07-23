import React, {useContext, useEffect, useRef} from 'react';
import {CardRefContext, DefaultImageLinkContext} from "./cardsContext";
import PersonIcon from '@material-ui/icons/Person';

let CardText = props => {
    let {
        designator,
        text,
        testid
    } = props;

    if (designator !== undefined)
        designator = `${designator}: `;
    else
        designator = "";

    return <>
        <span data-testid={testid} className='card-text'>{ designator }{ text }</span>
        <br/>
        </>;
};

let Card = props => {
    const {reference : ref, setRef} = useContext(CardRefContext);
    const defaultImageLink = useContext(DefaultImageLinkContext);

    const imageRef = useRef(null);

    const {
        artist : {
            birth_date : artistBirthDate,
            death_date : artistDeathDate,
            name : artistName
        },
        date,
        description,
        historyNote,
        imageId,
        place
    } = props.data;

    useEffect(() => {
        ref.push(imageRef.current);

        setRef(ref);
    }, [ref, setRef]);

    let text;

    if (historyNote !== '')
        text = <CardText text={ historyNote } testid='historyNote' />;
    else if (description !== '')
        text = <CardText text={ description } testid='description' />;

    let cardTextTop = artistName;

    if (typeof artistName === "undefined")
        cardTextTop = 'Unknown artist';

    if (artistBirthDate !== '' && artistBirthDate !== undefined)
        cardTextTop += ` (${artistBirthDate}`;

    if (artistDeathDate !== '' && artistDeathDate !== undefined)
        cardTextTop += ` - ${artistDeathDate})`;
    else if (artistBirthDate !== '' && artistBirthDate !== undefined)
        cardTextTop += ")";

    let directory = imageId.slice(0, 6);
    let imageUrl = 'http://media.vam.ac.uk/media/thira/collection_images';

    imageUrl = `${imageUrl}/${directory}/${imageId}.jpg`;

    return (
        <div className="col mb-4">
            <div className='card h-100'>
                <div className='card-header'>
                    <div className='row'>
                        <div className='col'>
                            <span data-testid='Card authors name and lifespan'>{cardTextTop}</span>
                        </div>

                        <div className='col-2 p-0'>
                            <PersonIcon />
                        </div>
                    </div>
                </div>

                <img
                    className='card-img'
                    ref={imageRef}
                    src={defaultImageLink}
                    data-src={imageUrl}
                    alt="If you see this sentence, try to reload page"
                />

                <div className='card-body'>
                    {text}

                    {date &&
                        <CardText designator="Date" text={date} testid='date'/>
                    }

                    <CardText designator="Place" text={place} testid='place'/>
                </div>
            </div>
        </div>
    );
};

export default Card;