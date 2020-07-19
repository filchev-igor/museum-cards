import React, {useState} from 'react';
import {render, screen} from '@testing-library/react';
import {SettingsProvider} from "../settingsContext";
import SettingsList from "../settingsList";
import userEvent from "@testing-library/user-event";

let UseSettingsState = () => {
    const [author, setAuthor] = useState(null);
    const [date, setDate] = useState(null);
    const [hide, setHide] = useState(null);

    return {author, setAuthor, date, setDate, hide, setHide};
};

let extractHooks = () => {
    const hookVal = {};

    let HookComponent = () => {
        Object.assign(hookVal, UseSettingsState());

        return null;
    };

    render(<HookComponent />);

    return hookVal;
};

const RenderingComponent = props => {
    const {hooks} = props;

    return (
        <SettingsProvider
            author={hooks.author}
            setAuthor={hooks.setAuthor}
            date={hooks.date}
            setDate={hooks.setDate}
            hide={hooks.hide}
            setHide={hooks.setHide}
        >
            <SettingsList />
        </SettingsProvider>
    );
};

test('Testing sorting setting by author name', () => {
    const hooks = extractHooks();

    const {rerender} = render(<RenderingComponent hooks={hooks} />);

    const authorParentElement = screen.getByText('Sort by author name').parentElement;

    const authorButton1 = authorParentElement.children[1].firstChild;
    const authorButton2 = authorParentElement.children[2].firstChild;

    userEvent.click(authorButton1);

    rerender(<RenderingComponent hooks={hooks} />);
    expect(hooks.author).not.toBe('descending');

    userEvent.click(authorButton2);

    rerender(<RenderingComponent hooks={hooks} />);
    expect(hooks.author).toBe('descending');
    expect(authorButton2).toHaveClass('active');

    userEvent.click(authorButton2);

    expect(hooks.author).toBe(null);
});

test('Testing sorting setting by date', () => {
    const hooks = extractHooks();

    const {rerender} = render(<RenderingComponent hooks={hooks} />);

    const dateParentElement = screen.getByText('Sort by date').parentElement;

    const dateButton1 = dateParentElement.children[1].firstChild;
    const dateButton2 = dateParentElement.children[2].firstChild;

    userEvent.click(dateButton2);

    rerender(<RenderingComponent hooks={hooks} />);
    expect(dateButton2).toHaveClass('active');

    userEvent.click(dateButton2);

    rerender(<RenderingComponent hooks={hooks} />);
    expect(dateButton2).not.toHaveClass('active');

    userEvent.click(dateButton1);

    rerender(<RenderingComponent hooks={hooks} />);
    expect(dateButton1).toHaveClass('active');

    userEvent.click(dateButton1);

    rerender(<RenderingComponent hooks={hooks} />);
    expect(dateButton1).not.toHaveClass('active');

    userEvent.click(dateButton1);

    rerender(<RenderingComponent hooks={hooks} />);
    expect(dateButton1).toHaveClass('active');
});

test('Testing hide setting', () => {
    const hide = ['', 'description', 'date', 'authors name'];

    const hooks = extractHooks();

    const {rerender} = render(<RenderingComponent hooks={hooks} />);

    const hideParentElement = screen.getByText('Hide cards without').parentElement;

    const hideButton1 = hideParentElement.children[1].firstChild;
    const hideButton2 = hideParentElement.children[2].firstChild;
    const hideButton3 = hideParentElement.children[3].firstChild;

    userEvent.click(hideButton3);

    expect(hooks.hide).toBe(hide[3]);

    rerender(<RenderingComponent hooks={hooks} />);

    userEvent.click(hideButton1);

    expect(hooks.hide).toBe(hide[1]);

    rerender(<RenderingComponent hooks={hooks} />);

    userEvent.click(hideButton2);

    expect(hooks.hide).toBe(hide[2]);

    rerender(<RenderingComponent hooks={hooks} />);

    userEvent.click(hideButton2);

    expect(hooks.hide).toBe(null);
});