import * as actions from '../constants/actions';

export const setState = state => {
	return {
		type: actions.SET_STATE,
		state
	};
};

export const setDisplayedDiv = option => {
	return {
		type: actions.SET_DISPLAYED_DIV,
		option
	};
};