import React from "react";
import {act, render, screen} from '@testing-library/react';
import * as fetchFunc from "../fetchFunc";
import App from "../App";
import {fetchData, fetchFullData} from "../fetchFunc";

const TEST_TEXT = 'Feeding app with the fake data to see there are any errors to be present';

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
        imageId: '40frg43'
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
        imageId: '40frg44'
    },
    {
        artist: {
            birth_date: "",
            death_date: "",
            name: 'Horse Notsugarlove'
        },
        historyNote: "Colour photograph of a domestic interior, taken outside of Beijing.",
        place: "China",
        date: "2005-01-01",
        description : "",
        imageId: '40frg45'
    },
    {
        artist: {
            birth_date: "",
            death_date: "",
            name: 'Horse Notsugarlove'
        },
        historyNote: "Colour photograph of a domestic interior, taken outside of Beijing.",
        place: "China",
        date: "2005-01-01",
        description : "",
        imageId: '40frg46'
    },
    {
        artist: {
            birth_date: "",
            death_date: "",
            name: 'Horse Notsugarlove'
        },
        historyNote: "Colour photograph of a domestic interior, taken outside of Beijing.",
        place: "China",
        date: "2005-01-01",
        description : "",
        imageId: '40frg47'
    },
    {
        artist: {
            birth_date: "",
            death_date: "",
            name: 'Horse Notsugarlove'
        },
        historyNote: "Colour photograph of a domestic interior, taken outside of Beijing.",
        place: "China",
        date: "2005-01-01",
        description : "",
        imageId: '40frg48'
    },
    {
        artist: {
            birth_date: "",
            death_date: "",
            name: 'Horse Notsugarlove'
        },
        historyNote: "Colour photograph of a domestic interior, taken outside of Beijing.",
        place: "China",
        date: "2005-01-01",
        description : "",
        imageId: '40frg49'
    },
    {
        artist: {
            birth_date: "",
            death_date: "",
            name: 'Horse Notsugarlove'
        },
        historyNote: "Colour photograph of a domestic interior, taken outside of Beijing.",
        place: "China",
        date: "2005-01-01",
        description : "",
        imageId: '40frg50'
    },
    {
        artist: {
            birth_date: "",
            death_date: "",
            name: 'Horse Notsugarlove'
        },
        historyNote: "Colour photograph of a domestic interior, taken outside of Beijing.",
        place: "China",
        date: "2005-01-01",
        description : "",
        imageId: '40frg51'
    },
    {
        artist: {
            birth_date: "",
            death_date: "",
            name: 'Horse Notsugarlove'
        },
        historyNote: "Colour photograph of a domestic interior, taken outside of Beijing.",
        place: "China",
        date: "2005-01-01",
        description : "",
        imageId: '40frg52'
    },
    {
        artist: {
            birth_date: "",
            death_date: "",
            name: 'Horse Notsugarlove'
        },
        historyNote: "Colour photograph of a domestic interior, taken outside of Beijing.",
        place: "China",
        date: "2005-01-01",
        description : "",
        imageId: '40frg53'
    },
];

test(TEST_TEXT, async () => {
    const mockFetchPromise = Promise.resolve({});
    const mockFetchFullPromise = Promise.resolve(FAKE_DATA);

    jest.spyOn(fetchFunc, 'fetchData').mockImplementation(() => mockFetchPromise);
    jest.spyOn(fetchFunc, 'fetchFullData').mockImplementation(() => mockFetchFullPromise);

    await act(async () => {
        render(<App/>);
    });

    let artists = screen.getAllByTestId('Card authors name and lifespan');
    let historyNotes = screen.getAllByTestId('historyNote');
    let descriptions = screen.getAllByTestId('description');
    let dates = screen.getAllByTestId('date');
    let places = screen.getAllByTestId('place');

    artists = artists.map(value => value.textContent);
    historyNotes = historyNotes.map(value => value.textContent);
    descriptions = descriptions.map(value => value.textContent);
    dates = dates.map(value => value.textContent);
    places = places.map(value => value.textContent);

    expect(artists.includes('Horse Notsugarlove')).toBe(true);
    expect(historyNotes.includes('Colour photograph of a domestic interior, taken outside of Beijing.')).toBe(true);
    expect(descriptions.includes('Colour photograph of a domestic interior, taken outside of Beijing.')).toBe(true);
    expect(dates.some(s => s.includes('2005-01-01'))).toBe(true);
    expect(places.some(s => s.includes('China'))).toBe(true);
});

