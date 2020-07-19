import React from "react";

const AuthorSettingContext = React.createContext(null);

const DateSettingContext = React.createContext(null);

const HideSettingContext = React.createContext(null);

const SettingsProvider = props => {
    const {
        author, setAuthor,
        date, setDate,
        hide, setHide
    } = props;

    return (
        <AuthorSettingContext.Provider value={{author, setAuthor}}>
            <DateSettingContext.Provider value={{date, setDate}}>
                <HideSettingContext.Provider value={{hide, setHide}}>
                    { props.children }
                </HideSettingContext.Provider>
            </DateSettingContext.Provider>
        </AuthorSettingContext.Provider>
    );
};

export {AuthorSettingContext, DateSettingContext, HideSettingContext, SettingsProvider};