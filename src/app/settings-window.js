import React, {useContext, useEffect, useRef} from 'react';
import SettingsList from "./settings-list";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import {HideSettingContext} from "./settings-contexts";
import SettingsIcon from '@material-ui/icons/Settings';

let SettingsWindow = (props) => {
    const {hideSetting} = useContext(HideSettingContext);

    const displayedCardsRef = useRef(null);
    const collapseSettingsButtonRef = useRef(null);

    const {
        data,
        dataProperties,
        setDataProperties,
        collapseRef
    } = props;

    const {
        collapsed,
        buttonText,
        windowHeight
    } = dataProperties;

    let toggleCollapsed = () => {
        const blockHeight = collapseRef.current.scrollHeight + 'px';

        let sectionHeight = 0;

        if (collapsed)
            sectionHeight = blockHeight;

        collapseRef.current.style.height = sectionHeight;

        let transitionEndFunc = () => {
            collapseRef.current.removeEventListener('transitionend', transitionEndFunc);

            let text;

            if (!collapsed)
                text = "Open settings window ";
            else
                text = "Hide settings window ";

            const object = {
                collapsed: !collapsed,
                buttonText: text,
                windowHeight: sectionHeight
            };

            setDataProperties(object);
        }

        collapseRef.current.addEventListener('transitionend', transitionEndFunc);
    };

    const cardsNumber = Object.values(data).filter(cardData => {
        const {
            artist,
            date,
            description,
            historyNote
        } = cardData;

        if (hideSetting === "description") {
            if (historyNote === '' || description === '') {
                return false;
            }
        }
        else if (hideSetting === "date") {
            if (!date)
                return false;
        }
        else if (hideSetting === "authors name") {
            if (typeof artist['name'] === "undefined")
                return false;
        }

        return cardData;
    }).length;

    useEffect(() => {
        let resizeElementHeight = () => {
            if (!collapsed) {
                collapseRef.current.style.height = 'auto';

                collapseRef.current.style.height = collapseRef.current.scrollHeight + 'px';
            }
        };

        window.addEventListener('resize', resizeElementHeight);

        return () => window.removeEventListener('resize', resizeElementHeight);
    });

    useEffect(() => {
        let buttonsGridExtraSmall = () => {
            const innerWidth = window.innerWidth;

            if (innerWidth < 576) {
                displayedCardsRef.current.classList.add('w-100');
                collapseSettingsButtonRef.current.classList.add('w-100');
            }
            else{
                displayedCardsRef.current.classList.remove('w-100');
                collapseSettingsButtonRef.current.classList.remove('w-100');
            }
        }

        window.addEventListener('resize', buttonsGridExtraSmall);

        return () => window.removeEventListener('resize', buttonsGridExtraSmall);
    });

    return <>
        <div className="row my-4 row-cols-1 row-cols-sm-2">
            <div className="col">
                <div
                    ref={displayedCardsRef}
                     className="btn border btn-light rounded-0 text-primary">
                    You can observe {cardsNumber} cards
                </div>
            </div>

            <div className="col">
                <button
                    type="button"
                    ref={collapseSettingsButtonRef}
                    className="btn btn-light border rounded-0 text-primary float-right"
                    onClick={ toggleCollapsed }
                >
                    {buttonText}

                    <SettingsIcon />
                </button>
            </div>
        </div>

        <div className="row mb-4">
            <div ref={ collapseRef } className="col collapsing" style={{ height: windowHeight}}>
                <div className="card card-body">
                    <SettingsList />

                    <div className="row row-cols-1 justify-content-center">
                        <div className="col-sm-4 col-md-3">
                            <Tooltip
                                title="Click on the active button to reset its value"
                                arrow={true}
                            >
                                <div className="btn btn-dark border rounded-0 w-100">
                                    <HelpOutlineIcon />
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default SettingsWindow;