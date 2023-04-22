import types from './types';

export const userReducer = (state = {}, action) => {
	switch (action.type) {
		case types.CREATE_USER_SUCCESS:
			alert('Successfully signed up. You can now sign in.');
			return [state, ...action.payload];
		case types.CREATE_USER_FAILURE:
			return state;
		case types.GET_USER_SUCCESS:
			return { ...state, ...action.payload };
		case types.GET_USER_FAILURE:
			return {};
		case types.UPDATE_USER_SUCCESS:
			state = { ...state, ...action.payload };
			return state;
		case types.UPDATE_USER_FAILURE:
			return state;
		case types.DELETE_USER_SUCCESS:
			return {};
		case types.GET_SAVED_COSMETICS_SUCCESS:
			return { ...state, saved_cosmetics: action.payload };
		case types.ADD_COSMETIC_SUCCESS:
			return { ...state, saved_cosmetics: [ ...state.saved_cosmetics, action.payload ]};
		case types.DELETE_USER_FAILURE:
			return state;
		case types.DELETE_COSMETIC_SUCCESS:
			return { ...state, saved_cosmetics: state.saved_cosmetics.filter((cosmetic) => cosmetic._id != action.payload)};
		case types.GET_SAVED_PALETTES_SUCCESS:
			return { ...state, saved_palettes: action.payload };
		case types.DELETE_PALETTE_SUCCESS:
			return { ...state, saved_palettes: state.saved_palettes.filter((palette) =>  palette._id != action.payload)};
		case types.DELETE_PROFILE_PICTURE_SUCCESS:
			return state;
		case types.DELETE_PROFILE_PICTURE_FAILURE:
			return state;
		default:
			return state;
	};
};
