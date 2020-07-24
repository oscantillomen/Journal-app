const { authReducer } = require('../../components/reducers/authReducer');
const { types } = require('../../redux/types/types');

describe('Pruebas en authReducer', () => {
	test('Debe loguearse correctamente', () => {
		const initialState = {};
		const action = {
			type: types.login,
			payload: {
				uid: 'abc',
				displayName: 'Oscar'
			}
		};

		const state = authReducer(initialState, action);
		expect(state).toEqual({
			uid: 'abc',
			name: 'Oscar'
		});
	});

	test('Debe desloguearse correctamente', () => {
		const initialState = {
			uid: 'abc',
			name: 'Oscar'
		};

		const action = {
			type: types.logout
		};

		const state = authReducer(initialState, action);
		expect(state).toEqual({});
	});

	test('No debe hacer cambios en el state', () => {
		const initialState = {
			uid: 'abc',
			name: 'Oscar'
		};

		const action = {
			type: 'abcde'
		};

		const state = authReducer(initialState, action);
		expect(state).toEqual(initialState);
	});
});
