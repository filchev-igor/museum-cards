import React, {useContext, useEffect, useRef} from 'react';
import SettingsList from "./settingsList";
import {HideSettingContext} from "./settingsContext";
import "./settingsWindow.css";
import {Tooltip} from "bootstrap/dist/js/bootstrap.esm.min";

let SettingsWindow = props => {
    const {hide} = useContext(HideSettingContext);

    const collapseBlockContainerRef = useRef(null);

    const tooltipRef = useRef(null);

    const {
        data,
        dataProperties: {
            collapsed,
            buttonText,
            windowHeight
        },
        setDataProperties,
        collapseBlockRef
    } = props;

    let toggleCollapsed = () => {
        collapseBlockContainerRef.current.classList.toggle('mb-4');

        let sectionHeight = 0;

        if (collapsed)
            sectionHeight = collapseBlockRef.current.scrollHeight + 'px';

        collapseBlockRef.current.style.height = sectionHeight;

        let transitionEndFunc = () => {
            collapseBlockRef.current.removeEventListener('transitionend', transitionEndFunc);

            let text;

            if (!collapsed)
                text = "Open settings window";
            else
                text = "Hide settings window";

            const object = {
                collapsed: !collapsed,
                buttonText: text,
                windowHeight: sectionHeight
            };

            setDataProperties(object);
        }

        collapseBlockRef.current.addEventListener('transitionend', transitionEndFunc);
    };

    const cardsNumber = data.filter(value => {
        const {
            artist: {
                name: artistName
            },
            description: {
                summary
            },
            object: {
                productionDates: {
                    approximate : approximateDate
                },
                history : objectHistory
            }
        } = value;

        if (hide === "artist name") {
            if (!artistName)
                return false;
        }
        else if (hide === "summary") {
            if (!summary) {
                return false;
            }
        }
        else if (hide === "date") {
            if (!approximateDate)
                return false;
        }
        else if (hide === "object history") {
            if (!objectHistory)
                return false;
        }

        return value;
    }).length;

    useEffect(() => {
        let resizeElementHeight = () => {
            if (!collapsed) {
                collapseBlockRef.current.style.height = 'auto';

                collapseBlockRef.current.style.height = collapseBlockRef.current.scrollHeight + 'px';
            }
        };

        window.addEventListener('resize', resizeElementHeight);

        return () => window.removeEventListener('resize', resizeElementHeight);
    });

    useEffect(() => {
        const tooltip = new Tooltip(tooltipRef.current);

        return () => tooltip;
    }, []);

    return <>
        <div className="row gap-3 gap-sm-0 my-4 row-cols-1 row-cols-sm-2 d-print-none">
            <div className="col">
                <div
                    className="btn border btn-light rounded-0 text-primary d-grid d-sm-inline-block">
                    You can observe {cardsNumber} cards
                </div>
            </div>

            <div className="col text-end d-grid d-sm-inline-block">
                <button
                    type="button"
                    className={`btn btn-light border rounded-0 text-primary float-right ${!collapsed ? 'active' : ''}`}
                    onClick={ toggleCollapsed }
                >
                    {buttonText + " "}

                    <i className="bi bi-gear">

                    </i>
                </button>
            </div>
        </div>

        <div ref={collapseBlockContainerRef} className={"row " + (!collapsed ? 'mb-4' : '')}>
            <div
                ref={ collapseBlockRef }
                className="col collapsing"
                style={{height: windowHeight}}
                data-testid='collapseBlock'
            >
                <div className="card card-body">
                    <SettingsList />

                    <div className="row row-cols-1 justify-content-center">
                        <div className="col-sm-4 col-md-3">
                            <button
                                ref={tooltipRef}
                                type="button"
                                className="btn btn-dark rounded-0 border w-100"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Click on the active button to reset its value">
                                <i className="bi bi-question-circle">

                                </i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default SettingsWindow;