import React, {useState, useEffect} from 'react';
import Cards from "./Cards";
import SettingsWindow from "./settings-window";
import "./App.css";
import {
    AuthorContext, DateContext, HideContext, CardRefContext, DefaultImageLinkContext
} from "./settings-contexts";

let App = () => {
    const [data, setData] = useState([]);
    const [ref, setRef] = useState([]);
    const [author, setAuthor] = useState(null);
    const [date, setDate] = useState(null);
    const [hide, setHide] = useState(null);

    const defaultImageLink = 'https://js.cx/lazyimg/1.gif';

    useEffect(() => {
        let data = async () => {
            let url = 'https://www.vam.ac.uk/api/json/museumobject/search?';
            let object = 'objectnamesearch=Photograph';
            let place = 'placesearch=China';
            let images = 'images=1';

            url = `${url}&${object}&${place}&${images}`;

            let response = await fetch(url);

            if (response.ok)
                return await response.json();
        }

        let museumData = async (inputData) => {
            let museumData = [];

            let records = inputData['records'];

            for (let key of records) {
                let museumNumber = key['fields']['object_number'];

                let url = 'https://www.vam.ac.uk/api/json/museumobject';

                url = `${url}/${museumNumber}`;

                let response = await fetch(url);

                let museumObject;

                if (response.ok)
                    museumObject = await response.json();

                museumObject = museumObject[0]['fields'];

                let artistData;

                if (museumObject['names'].length)
                    artistData = museumObject['names'][0]['fields'];
                else
                    artistData = "";

                let place = museumObject['places'][0]['fields'];

                let object = {
                    artist: {
                        name: artistData['name'],
                        birth_date: artistData['birth_date'],
                        death_date: artistData['death_date']
                    },
                    historyNote: museumObject['history_note'],
                    place: place['name'],
                    date: museumObject['date_start'],
                    description: museumObject['physical_description'],
                    imageId: museumObject['primary_image_id']
                };

                museumData.push(object);
            }

            return museumData;
        };

        data()
            .then(result => museumData(result))
            .then(result => setData(result));
    }, []);

    useEffect(() => {
        let lazyLoad = () => {
            let reference = ref;

            for (let i = 0; i < reference.length; i++) {
                let img = reference[i];

                let imgTop = img.getBoundingClientRect().top;
                let imgBottom = img.getBoundingClientRect().bottom;

                let pageYOffset = window.pageYOffset;
                let windowHeight = document.documentElement.clientHeight;

                if ((pageYOffset < pageYOffset + imgTop && pageYOffset + imgTop < pageYOffset + windowHeight)
                    || (pageYOffset < pageYOffset + imgBottom && pageYOffset + imgBottom < pageYOffset + windowHeight)) {
                    img.src = img.dataset.src;

                    reference.splice(i, 1);

                    i--;
                }
            }

            setRef(reference);

            if (!reference.length) {
                window.removeEventListener("scroll", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
            }
        };

        lazyLoad();
        window.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);

        return () => {
            window.removeEventListener("scroll", lazyLoad);
            window.removeEventListener("resize", lazyLoad);
        };
    });

    const SettingsProvider = (props) => {
        return <>
            <AuthorContext.Provider value={{author, setAuthor}}>
                <DateContext.Provider value={{date, setDate}}>
                    <HideContext.Provider value={{hide, setHide}}>
                        { props.children }
                    </HideContext.Provider>
                </DateContext.Provider>
            </AuthorContext.Provider>
        </>
    };

    const CardsProvider = (props) => {
        return <>
            <AuthorContext.Provider value={{author}}>
                <DateContext.Provider value={{date}}>
                    <HideContext.Provider value={{hide}}>
                        <CardRefContext.Provider value={{ref, setRef}}>
                            <DefaultImageLinkContext.Provider value={defaultImageLink}>
                                { props.children }
                            </DefaultImageLinkContext.Provider>
                        </CardRefContext.Provider>
                    </HideContext.Provider>
                </DateContext.Provider>
            </AuthorContext.Provider>
        </>
    };

    return (
        <div className="container">
            <SettingsProvider>
                <SettingsWindow />
            </SettingsProvider>

            <CardsProvider>
                <Cards
                    data={ data }
                />
            </CardsProvider>
        </div>
    );
};

export default App;
