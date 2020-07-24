import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { login, logout, startLogout, startLoginEmailPassword } from '../../../redux/actions/auth';
import { types } from '../../../redux/types/types';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initialState = {};

let store = mockStore(initialState);

describe('Pruebas con las acciones de Auth', () => {
	beforeEach(() => {
		store = mockStore(initialState);
	});

	test('Login y Logout deben de crear la acción respectiva', () => {
		const loginAction = login('testing_id', 'Oscar Cantillo');
		expect(loginAction).toEqual({
			type: types.login,
			payload: {
				uid: 'testing_id',
				displayName: 'Oscar Cantillo'
			}
		});

		const logoutAction = logout();

		expect(logoutAction).toMatchObject({ type: types.logout });
	});

	test('Debe realizar el startLogOut', async () => {
		await store.dispatch(startLogout());

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.logout
		});

		expect(actions[1]).toEqual({
			type: types.notesLogoutCleaning
		});
	});

	it('Debe iniciar el startLoginEmailPassword', async () => {
		await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'));

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.uiStartLoading
		});

		expect(actions[1]).toEqual({
			type: types.login,
			payload: {
				uid: 'kRfFAg9WIfhgEETXaedn6iix29t2',
				displayName: null
			}
		});

		expect(actions[2]).toEqual({
			type: types.uiFinishLoading
		});
	});
});
