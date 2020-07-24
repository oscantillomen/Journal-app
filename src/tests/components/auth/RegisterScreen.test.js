import React from 'react';
import { mount } from 'enzyme';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import '@testing-library/jest-dom';
import { types } from '../../../redux/types/types';

const midlewares = [ thunk ];
const mockStore = configureStore(midlewares);

const initialState = {
	auth: {},
	ui: {
		msgError: null
	}
};

let store = mockStore(initialState);

const wrapper = mount(
	<Provider store={store}>
		<MemoryRouter>
			<RegisterScreen />
		</MemoryRouter>
	</Provider>
);

describe('Pruebas en <RegisterScreen/>', () => {
	test('Debe mostarse correctamente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('Debe hacer el dispatch de la acción respectiva', () => {
		const emailField = wrapper.find('input[name="email"]');
		emailField.simulate('change', {
			target: {
				value: '',
				name: 'email'
			}
		});

		wrapper.find('form').simulate('submit', {
			preventDefault() {}
		});

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.uiSetError,
			payload: 'Email is not valid'
		});
	});

	test('Debe mostrar la caja de alerta con error', () => {
		const initialState = {
			auth: {},
			ui: {
				msgError: 'Email no es correcto'
			}
		};

		const store = mockStore(initialState);

		const wrapper = mount(
			<Provider store={store}>
				<MemoryRouter>
					<RegisterScreen />
				</MemoryRouter>
			</Provider>
        );
        
        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initialState.ui.msgError);
	});
});
