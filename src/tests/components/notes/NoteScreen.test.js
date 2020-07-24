import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../redux/actions/notes';


jest.mock('../../../redux/actions/notes', () => ({
    activeNote: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configStore(middlewares);
const initialState = {
    notes: {
        active: {
            id: '123',
            title: 'HOla',
            body: 'mundo'
        }
    }
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <NoteScreen />
    </Provider>
);

describe('Pruebas en <NoteScreen />', () => {
    
    test('Debe de mostarrse correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe disparar el activeNote', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            name: 'title',
            value: 'Hi'
        });

        expect(activeNote).toHaveBeenLastCalledWith(
            '123',
            {
                body: 'mundo',
                title: 'HOla',
                id: '123',
            }
        );
    });
})
