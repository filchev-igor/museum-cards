export const fetchData = async () => {
    const path = "https://api.vam.ac.uk/v2/objects/search";
    const query = {
        q_object_name: "Photograph",
        q_place_name: "China",
        min_length: 2,
        max_length: 16,
        images_exist: false,
        order_sort: "asc",
        page: 2,
        page_size: 1, //till 100
        cluster_size: 20,
        images: true,
        random: false
    };

    const fullQuery = Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .reduce((previousValue, currentValue) => `${previousValue}&${currentValue}`);

    const url = `${path}?${fullQuery}`;

    const response = await fetch(url);

    if (response.ok)
        return await response.json();
}

export const fetchFullData = async (inputData) => {
    const array = [];

    const systemNumbers = inputData['records']
        .map(value => value['systemNumber']);

    for (const value of systemNumbers) {
        const url = `https://api.vam.ac.uk/v2/object/${value}?response_format=json`;

        const response = await fetch(url);

        if (response.ok) {
            const responseObject = await response.json();

            const record = responseObject['record'];

            const obj = {
                artist: {
                    name: record['artistMakerPerson'][0]['name']['text'],
                    profession: record['artistMakerPerson'][0]['association']['text']
                },
                description: {
                    summary: record['summaryDescription'],
                    brief: record['briefDescription']
                },
                object: {
                    materialsAndTechniques: record['materialsAndTechniques'],
                    physicalDescription: record['physicalDescription'],
                    type: record['objectType'],
                    productionDates: {
                        approximate: record['productionDates'][0]['date']['text'],
                        earliest: record['productionDates'][0]['date']['earliest'],
                        latest: record['productionDates'][0]['date']['latest']
                    },
                    history: record['objectHistory'],
                    placeOrigin: record['placesOfOrigin'][0]['place']['text'],
                },
                imageId: responseObject['meta']['images']['_images_meta'][0]['assetRef']
            };

            array.push(obj);
        }
    }

    return array;
};