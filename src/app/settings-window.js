import React, {useEffect, useRef, useState} from 'react';
import SettingsList from "./settings-list";

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
                </div>
            </div>
        </div>
    </>;
};

export default SettingsWindow;