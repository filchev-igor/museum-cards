export const fetchData = async () => {
    let url = 'https://www.vam.ac.uk/api/json/museumobject/search?';
    let object = 'objectnamesearch=Photograph';
    let place = 'placesearch=China';
    let images = 'images=1';

    url = `${url}&${object}&${place}&${images}`;

    let response = await fetch(url);

    if (response.ok)
        return await response.json();
}

export const fetchFullData = async (inputData) => {
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