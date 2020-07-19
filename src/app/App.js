import React, {useState, useEffect, useRef} from 'react';
import Cards from "./Cards";
import SettingsWindow from "./settingsWindow";
import {SettingsProvider} from "./settingsContext";
import {CardsProvider} from "./cardsContext";

let App = () => {
    const [data, setData] = useState([]);

    const [ref, setRef] = useState([]);

    //Parameters, which are used to setup the cards display modes
    const [author, setAuthor] = useState(null);
    const [date, setDate] = useState(null);
    const [hide, setHide] = useState(null);

    const [dataProperties, setDataProperties] = useState({
        collapsed: true,
        buttonText: "Open settings window",
        windowHeight: 0
    });

    const defaultImageLink = 'https://js.cx/lazyimg/1.gif';

    const collapseBlockRef = useRef(null);

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
            for (let i = 0; i < ref.length; i++) {
                let img = ref[i];

                let imgTop = img.getBoundingClientRect().top;
                let imgBottom = img.getBoundingClientRect().bottom;

                let pageYOffset = window.pageYOffset;
                let windowHeight = document.documentElement.clientHeight;

                if ((pageYOffset < pageYOffset + imgTop && pageYOffset + imgTop < pageYOffset + windowHeight)
                    || (pageYOffset < pageYOffset + imgBottom && pageYOffset + imgBottom < pageYOffset + windowHeight)) {
                    img.src = img.dataset.src;
                    delete img.dataset.src;

                    ref.splice(i, 1);

                    i--;
                }
            }

            setRef(ref);

            if (!ref.length) {
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
    }, [data, ref, author, date, hide]);

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

            <CardsProvider
                reference={ref}
                setRef={setRef}
                defaultImageLink={defaultImageLink}
            >
                <Cards
                    author={author}
                    date={date}
                    hide={hide}
                    data={[...data]}
                />
            </CardsProvider>
        </div>
    );
};

export default App;
