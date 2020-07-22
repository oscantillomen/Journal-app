import { types } from '../../redux/types/types';
// {
//uid: 'lkjksdsds1d3s51d3sds1d'
//name: 'Oscar'
// }

export const authReducer = (state = {}, action) => {
	switch (action.type) {
		case types.login:
			return {
				uid: action.payload.uid,
				name: action.payload.displayName
			};

		case types.logout:
			return {};

		default:
			return state;
	}
};
