import { Map } from 'immutable';

import * as actions from '../constants/actions';

const setState = (state, newState) => {
	return state.mergeDeep(newState);
};

const setDisplayedDiv = (state, option) => {
	return state.update('displayClasses', displayClasses => displayClasses.set('selected', option));
};

export default (state = Map(), action) => {
	switch (action.type) {
		case actions.SET_STATE:
			return setState(state, action.state);
		case actions.SET_DISPLAYED_DIV:
			return setDisplayedDiv(state, action.option);
		default:
			return state;
	};
	return state;
};