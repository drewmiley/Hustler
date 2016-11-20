import * as actions from '../constants/actions';

export const setState = state => {
	return {
		type: actions.SET_STATE,
		state
	}
}