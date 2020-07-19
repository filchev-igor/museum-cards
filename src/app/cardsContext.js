import React from "react";

const CardRefContext = React.createContext(null);

const DefaultImageLinkContext = React.createContext(null);

const CardsProvider = props => {
    const {
        reference, setRef,
        defaultImageLink
    } = props;

    return (
        <CardRefContext.Provider value={{reference, setRef}}>
            <DefaultImageLinkContext.Provider value={defaultImageLink}>
                { props.children }
            </DefaultImageLinkContext.Provider>
        </CardRefContext.Provider>
    );
};

export {CardRefContext, DefaultImageLinkContext, CardsProvider};