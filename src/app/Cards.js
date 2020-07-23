import React from 'react';
import Card from "./Card";

let Cards = (props) => {
    const {
        author : authorSetting,
        date : dateSetting,
        hide : hideSetting,
        data
    } = props;

    if (authorSetting === "ascending") {
        data.sort((a, b) => {
            let firstArtist = a['artist']['name'];
            let secondArtist = b['artist']['name'];

            if (firstArtist === undefined)
                return -1;
            else if(secondArtist === undefined)
                return 1;

            firstArtist = firstArtist.split(", ").map(artist => artist.toUpperCase());
            secondArtist = secondArtist.split(", ").map(artist => artist.toUpperCase());

            //Surname
            if (firstArtist[1] < secondArtist[1]) {
                return -1;
            }
            else if (firstArtist[1] > secondArtist[1]) {
                return 1;
            }

            //Name
            if (firstArtist[0] < secondArtist[0]) {
                return -1;
            }
            else if (firstArtist[0] > secondArtist[0]) {
                return 1;
            }

            //Returns zero, if surnames and names are equal
            return 0;
        });
    }
    else if (authorSetting === "descending") {
        data.sort((a, b) => {
            let firstArtist = a['artist']['name'];
            let secondArtist = b['artist']['name'];

            if (firstArtist === undefined)
                return 1;
            else if(secondArtist === undefined)
                return -1;

            firstArtist = firstArtist.split(", ").map(artist => artist.toUpperCase());
            secondArtist = secondArtist.split(", ").map(artist => artist.toUpperCase());

            //Surname
            if (firstArtist[1] < secondArtist[1]) {
                return 1;
            }
            else if (firstArtist[1] > secondArtist[1]) {
                return -1;
            }

            //Name
            if (firstArtist[0] < secondArtist[0]) {
                return 1;
            }
            else if (firstArtist[0] > secondArtist[0]) {
                return -1;
            }

            //Returns zero, if surnames and names are equal
            return 0;
        });
    }

    if (dateSetting === "ascending") {
        data.sort((a, b) => {
            let firstDate = a['date'];
            let secondDate = b['date'];

            if (firstDate === null)
                return -1;
            else if(secondDate === null)
                return 1;

            firstDate = firstDate.split('-');
            secondDate = secondDate.split('-');

            if (firstDate[0] < secondDate[0])
                return -1;
            else if (firstDate[1] < secondDate[1])
                return -1;
            else if (firstDate[2] < secondDate[2])
                return -1;

            //Returns zero, if surnames and names are equal
            return 0;
        });
    }
    else if (dateSetting === "descending") {
        data.sort((a, b) => {
            let firstDate = a['date'];
            let secondDate = b['date'];

            if (firstDate === null)
                return 1;
            else if(secondDate === null)
                return -1;

            firstDate = firstDate.split('-');
            secondDate = secondDate.split('-');

            if (firstDate[0] < secondDate[0])
                return 1;
            else if (firstDate[1] < secondDate[1])
                return 1;
            else if (firstDate[2] < secondDate[2])
                return 1;

            //Returns zero, if surnames and names are equal
            return 0;
        });
    }

    const cards = data.map(cardData => {
        const {
            artist: {
                name : artistName
            },
            date,
            description,
            historyNote,
            imageId
        } = cardData;

        if (hideSetting === "description") {
            if (historyNote === '' || description === '') {
                return null;
            }
        }
        else if (hideSetting === "date") {
            if (!date)
                return null;
        }
        else if (hideSetting === "authors name") {
            if (typeof artistName === "undefined")
                return null;
        }

        return <Card
            key={imageId}
            data={cardData}
        />
    });

    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            {cards}
        </div>
    );
};

export default Cards;