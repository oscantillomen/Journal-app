import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import '@testing-library/jest-dom';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../redux/actions/notes';

const midlewares = [ thunk ];

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

const note = {
	id: 10,
	date: 0,
	title: 'Hola',
	body: 'mundo',
	url: 'https://somewhere.com/picture.jpg'
};

const wrapper = mount(
	<Provider store={store}>
		<JournalEntry {...note} />
	</Provider>
);

describe('Pruebas en <JournalEntry/>', () => {
	test('Debe mostrarse correctamente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('Debe activar la note', () => {
		wrapper.find('.journal__entry').prop('onClick')();

		expect(store.dispatch).toHaveBeenCalledWith(activeNote(note.id, { ...note }));
	});
});
