const TEST_TEXT_1 = 'Feeding app with the fake data to see there are any errors to be present';
const TEST_TEXT_2 = 'Checking lazyLoad image downloading during scrolling'

const FAKE_DATA = [
    {
        artist: {
            birth_date: "",
            death_date: "",
            name: 'Cat Morisson'
        },
        historyNote: '',
        place: "China",
        date: "2005-01-01",
        description : "Colour photograph of a domestic interior, taken outside of Beijing.",
        imageId: '40frg45'
    },
    {
        artist: {
            birth_date: "",
            death_date: "",
            name: 'Dog Ferry'
        },
        historyNote: '',
        place: "China",
        date: "2003-01-01",
        description : "Colour photograph of a domestic interior, taken outside of Beijing.",
        imageId: '40frg45'
    },
    {
        artist: {
            birth_date: "",
            death_date: "",
            name: 'Horse Sugarlove'
        },
        historyNote: '',
        place: "China",
        date: "2005-01-01",
        description : "Colour photograph of a domestic interior, taken outside of Beijing.",
        imageId: '40frg45'
    }
];

test(TEST_TEXT_1, async () => {
    const fakeFetch = {
        get: jest.fn(() => Promise.resolve())
    }
});

test(TEST_TEXT_2, async () => {

});

