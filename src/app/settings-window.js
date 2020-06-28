import React, {useEffect, useRef, useState} from 'react';
import SettingsList from "./settings-list";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';

let SettingsWindow = (props) => {
    const [collapsed, setCollapsed] = useState(true);
    const [buttonText, setButtonText] = useState(" Open settings window");

    let collapseRef = useRef(null);

    let toggleCollapsed = () => {
        let sectionHeight = 0;

        if (collapsed)
            sectionHeight = collapseRef.current.scrollHeight + 'px';

        collapseRef.current.style.height = sectionHeight;

        setCollapsed(!collapsed);
    };

    useEffect(() => {
        if (collapsed)
            setButtonText(" Open settings window");
        else
            setButtonText(" Hide settings window");
    }, [collapsed]);

    return <>
        <div className="row my-4">
            <div className="col">
                <button
                    type="button"
                    className="btn btn-light border rounded-0 text-primary float-right"
                    onClick={ toggleCollapsed }
                >
                    <span className="oi oi-cog">

                    </span>

                    { buttonText }
                </button>
            </div>
        </div>

        <div className="row mb-4">
            <div ref={ collapseRef } className="col collapsing">
                <div className="card card-body">
                    <SettingsList
                        setAuthor={ props.setAuthor }
                        setDate={ props.setDate }
                        setHide={ props.setHide }
                    />

                    <div className="row row-cols-1 row-cols-md-1 justify-content-center">
                        <div className="col-md-3">
                            <Tooltip
                                title="Click on the active button to reset its value"
                                arrow={true}
                            >
                                <button
                                    type="button"
                                    className="btn btn-dark border rounded-0 w-100"
                                >
                                    <HelpOutlineIcon />
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default SettingsWindow;