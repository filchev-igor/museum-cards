import React, {useRef, useState} from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import SettingsWindow from "../settingsWindow";
import {SettingsProvider} from "../settingsContext";
import userEvent from "@testing-library/user-event";

let useHooks = () => {
    const [author, setAuthor] = useState(null);
    const [date, setDate] = useState(null);
    const [hide, setHide] = useState(null);

    const [dataProperties, setDataProperties] = useState({
        collapsed: true,
        buttonText: "Open settings window ",
        windowHeight: 0
    });

    const collapseBlockRef = useRef(null);

    return {
        author, setAuthor,
        date, setDate,
        hide, setHide,
        dataProperties, setDataProperties,
        collapseBlockRef
    };
};

let extractHooks = () => {
    const hookVal = {};

    let HookComponent = () => {
        Object.assign(hookVal, useHooks());

        return null;
    };

    render(<HookComponent />);

    return hookVal;
};

const isFieldHidden = (num, option) => {
    const totalOptions = 3;

    let number = num % totalOptions;

    number++;

    return number++ === option;
};

const RenderingComponent = props => {
    const {
        hooks,
        dataArrayLength
    } = props;

    const createData = () => {
        let createdData = [];

        for (let i = 0; i < dataArrayLength; i++) {
            let date = '10.12.1930';
            let description = 'El pueblo nostre';
            let historyNote = 'El pimbo';
            let artist = {
                name: 'Kiera'
            };

            if (hooks.hide === "description" && isFieldHidden(i, 1)) {
                historyNote = '';
                description = '';
            } else if (hooks.hide === "date" && isFieldHidden(i, 2)) {
                date = '';
            } else if (hooks.hide === "authors name" && isFieldHidden(i, 3)) {
                artist['name'] = undefined;
            }

            createdData.push({
                artist: artist,
                date: date,
                description: description,
                historyNote: historyNote
            });
        }

        return createdData;
    };

    const data = createData();

    return (
        <SettingsProvider
            author={hooks.author}
            setAuthor={hooks.setAuthor}
            date={hooks.date}
            setDate={hooks.setDate}
            hide={hooks.hide}
            setHide={hooks.setHide}
        >
            <SettingsWindow
                data={data}
                dataProperties={hooks.dataProperties}
                setDataProperties={hooks.setDataProperties}
                collapseBlockRef={hooks.collapseBlockRef}
            />
        </SettingsProvider>
    );
}

describe('Testing button, which displays number of rendered cards', () => {
    const hideAll = [null, "description", "date", "authors name"];

    test.each(hideAll)('Cards are hidden by the next field: %p', hide => {
        const hooks = extractHooks();

        const dataArrayLength = 13;

        hooks.hide = hide;

        render(<RenderingComponent
            hooks={hooks}
            dataArrayLength={dataArrayLength}
        />);

        const button = screen.getByText(/You can observe/);

        let calculateCards = () => {
            const index = hideAll.indexOf(hide);

            if (index > 0) {
                let array = [];

                for (let i = 0; i < dataArrayLength; i++) {
                    if (!isFieldHidden(i, index))
                        array.push({});
                }

                return array.length;
            }

            return dataArrayLength;
        };

        const cardsNumber = calculateCards();

        expect(button).toHaveTextContent(`You can observe ${cardsNumber} cards`);
    });
});

test('Checking of the button, that toggles view state of the settings window', () => {
    const hooks = extractHooks();

    const dataArrayLength = 13;

    const {rerender, debug} = render(<RenderingComponent
        hooks={hooks}
        dataArrayLength={dataArrayLength}
    />);

    const button = screen.getByRole('button', {name: /open settings window/i});
    const collapseBlock = screen.getByTestId('collapseBlock');

    for (let i = 0; i <= 6; i++) {
        rerender(<RenderingComponent
            hooks={hooks}
            dataArrayLength={dataArrayLength}
        />);

        fireEvent.click(button);
        fireEvent.transitionEnd(collapseBlock);
    }

    expect(hooks.dataProperties.collapsed).toBe(false);

    rerender(<RenderingComponent
        hooks={hooks}
        dataArrayLength={dataArrayLength}
    />);

    fireEvent.click(button);
    fireEvent.transitionEnd(collapseBlock);

    expect(hooks.dataProperties.collapsed).toBe(true);

    rerender(<RenderingComponent
        hooks={hooks}
        dataArrayLength={dataArrayLength}
    />);

    fireEvent.click(button);
    fireEvent.transitionEnd(collapseBlock);

    expect(hooks.dataProperties.collapsed).toBe(false);
});