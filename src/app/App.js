import React, {useState, useEffect, useRef} from 'react';
import Cards from "./Cards";
import SettingsWindow from "./settingsWindow";
import {SettingsProvider} from "./settingsContext";
import {CardRefContext, CardsProvider} from "./context";
import {fetchData, fetchFullData} from "./fetchFunc";

let App = () => {
    const [data, setData] = useState([]);

    const [reference, setReference] = useState([]);

    //Parameters, which are used to setup the cards display modes
    const [author, setAuthor] = useState(null);
    const [date, setDate] = useState(null);
    const [hide, setHide] = useState(null);

    const [dataProperties, setDataProperties] = useState({
        collapsed: true,
        buttonText: "Open settings window",
        windowHeight: 0
    });

    const collapseBlockRef = useRef(null);

    useEffect(() => {
        fetchData()
            .then(result => fetchFullData(result))
            .then(result => setData(result));
    }, []);

    useEffect(() => {
        let lazyLoad = () => {
            for (let i = 0; i < reference.length; i++) {
                let img = reference[i];

                let imgTop = img.getBoundingClientRect().top;
                let imgBottom = img.getBoundingClientRect().bottom;

                let pageYOffset = window.pageYOffset;
                let windowHeight = document.documentElement.clientHeight

                if ((pageYOffset < pageYOffset + imgTop && pageYOffset + imgTop < pageYOffset + windowHeight)
                    || (pageYOffset < pageYOffset + imgBottom && pageYOffset + imgBottom < pageYOffset + windowHeight)) {
                    img.src = img.dataset.src;
                    delete img.dataset.src;

                    reference.splice(i, 1);

                    i--;
                }
            }

            setReference(reference);

            if (!reference.length) {
                window.removeEventListener("scroll", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
            }
        };

        if (data.length)
            lazyLoad();

        window.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);

        return () => {
            window.removeEventListener("scroll", lazyLoad);
            window.removeEventListener("resize", lazyLoad);
        };
    }, [data, reference, author, date, hide]);

    return (
        <div className="container">
            <SettingsProvider
                author={author}
                setAuthor={setAuthor}
                date={date}
                setDate={setDate}
                hide={hide}
                setHide={setHide}
            >
                <SettingsWindow
                    dataProperties={dataProperties}
                    setDataProperties={setDataProperties}
                    collapseBlockRef={collapseBlockRef}
                    data={data}
                />
            </SettingsProvider>

            <CardRefContext.Provider value={{reference, setReference}}>
                <Cards
                    author={author}
                    date={date}
                    hide={hide}
                    data={[...data]}
                />
            </CardRefContext.Provider>
        </div>
    );
};

export default App;
