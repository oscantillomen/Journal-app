import React from 'react';
import { mount } from 'enzyme';
import { Sidebar } from '../../../components/journal/Sidebar';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import '@testing-library/jest-dom';
import { startLogout } from '../../../redux/actions/auth';
import { startNewNote } from '../../../redux/actions/notes';


jest.mock('../../../redux/actions/auth', () => ({
    startLogout: jest.fn(),
}));
jest.mock('../../../redux/actions/notes', () => ({
    startNewNote: jest.fn()
}));

const midlewares = [thunk];

const mockStore = configureStore(midlewares);

const initalState = {
    auth: {
        id: 'abc',
        name: 'Oscar Cantillo'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: null,
        notes: []
    }
};

let store = mockStore(initalState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <Sidebar />
    </Provider>
);

describe('Pruebas en <SideBar />', () => {

    beforeEach(() => {
        store = mockStore(initalState);
    })
    
    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe llamar el startLogout', () => {
        wrapper.find('button').prop('onClick')();
        expect(startLogout).toHaveBeenCalled();
    });

    test('Debe llamar el startNewNote', () => {
        wrapper.find('.journal__new-entry').simulate('click');
        expect(startNewNote).toHaveBeenCalled();
    });

});