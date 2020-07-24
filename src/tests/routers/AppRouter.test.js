import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../components/routers/AppRouter';
import { login } from '../../redux/actions/auth';
import { firebase } from '../../firebase/firebase-config';
import { act } from '@testing-library/react';

jest.mock('../../redux/actions/auth', () => ({
    login: jest.fn(),
}));

const midlewares = [ thunk ];
const mockStore = configureStore(midlewares);

const initState = {
	auth: {},
	ui: {
		loading: false,
		msgError: null
    },
    notes: {
        active: {
            id: 'abc',
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter/>', () => {
	test('Debe llamar el login si estoy autenticado', async () => {

        let user;
		await act(async () => {
            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCred.user;

			const wrapper = mount(
				<Provider store={store}>
					<MemoryRouter>
						<AppRouter />
					</MemoryRouter>
				</Provider>
			);
        });
        
        expect(login).toHaveBeenCalledWith('kRfFAg9WIfhgEETXaedn6iix29t2', null);
	});
});
