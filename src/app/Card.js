import React, {useContext, useEffect, useRef} from 'react';
import {CardRefContext} from "./context";
import CardSection from "./cardSection";
import {Collapse} from "bootstrap/dist/js/bootstrap.esm.min";

const placeholderImageLink = 'https://js.cx/lazyimg/1.gif';

let Card = props => {
    const {reference, setReference} = useContext(CardRefContext);

    const imageRef = useRef(null);
    const summaryRef = useRef(null);

    const {
        artist: {
            name: artistName,
            profession : artistProfession
        },
        description: {
            summary,
            brief : briefDescription
        },
        object: {
            materialsAndTechniques,
            physicalDescription,
            type : objectType,
            productionDates: {
                approximate : approximateDate,
                earliest : earliestDate,
                latest : latestDate
            },
            history : objectHistory,
            placeOrigin,
        },
        imageId
    } = props.data;

    useEffect(() => {
        reference.push(imageRef.current);

        setReference(reference);
    }, []);

    useEffect(() => {
        if (summary) {
            const bsCollapse = new Collapse(summaryRef.current);

            return () => bsCollapse;
        }
    }, []);

    const url = `https://framemark.vam.ac.uk/collections/${imageId}/full/full/0/default.jpg`;

    return (
        <div className="col mb-4">
            <div className='card h-100 bg-secondary text-light'>
                <img
                    className='card-img'
                    ref={imageRef}
                    src={placeholderImageLink}
                    data-src={url}
                    alt="Try to reload the page"/>

                <div className='card-body'>
                    <div className="row row-cols-2">
                        <CardSection left="artist" right={`${artistName} (${artistProfession})`}/>
                        <CardSection left="place of origin" right={placeOrigin}/>
                        <CardSection left="Date of creation" right={approximateDate} hasBorder={false}/>
                        <CardSection left="" right={`Probably between ${earliestDate} and ${latestDate}`}/>

                        {summary &&
                        <div className="col-12 text-center">
                            <a className="btn btn-outline-light"
                               ref={summaryRef}
                               data-bs-toggle="collapse"
                               href="#summary"
                               role="button"
                               aria-expanded="false"
                               aria-controls="summary">
                                Toggle summary
                            </a>
                        </div>}

                        {summary &&
                        <div className="col-12 collapse" id="summary">{summary}</div>}

                        <div className='col-12 text-uppercase py-4 fs-3 text-center mb-2 border-bottom border-1 border-dashed'>
                            object details
                        </div>

                        <CardSection left="brief description" right={briefDescription}/>
                        {objectHistory &&
                        <CardSection left="history" right={objectHistory}/>}
                        <CardSection left="type" right={objectType}/>
                        <CardSection left="physical description" right={physicalDescription}/>
                        <CardSection left="materials and techniques" right={materialsAndTechniques} hasBorder={false}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;