import React, {useContext, useEffect, useRef} from 'react';
import {CardRefContext, DefaultImageLinkContext} from "./cardsContext";
import PersonIcon from '@material-ui/icons/Person';

let CardText = props => {
    let {
        designator,
        text
    } = props;

    if (designator !== undefined)
        designator = `${designator}: `;
    else
        designator = "";

    return <>
        <span className='card-text'>{ designator }{ text }</span>
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
        text = <CardText text={ historyNote } />;
    else if (description !== '')
        text = <CardText text={ description } />;

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
                            <span>{ cardTextTop }</span>
                        </div>

                        <div className='col-2 p-0'>
                            <PersonIcon />
                        </div>
                    </div>
                </div>

                <img
                    className='card-img'
                    ref={ imageRef }
                    src={ defaultImageLink }
                    data-src={ imageUrl }
                    alt=""
                />

                <div className='card-body'>
                    { text }

                    {date &&
                        <CardText designator="Date" text={ date } />
                    }

                    <CardText designator="Place" text={ place } />
                </div>
            </div>
        </div>
    );
};

export default Card;