import { Map } from 'immutable';

import * as actions from '../constants/actions';

const setState = (state, newState) => {
    return state.mergeDeep(newState);
}

export default (state = Map(), action) => {
    switch (action.type) {
        case actions.SET_STATE:
            return setState(state, action.state);
        default:
            return state;
    }
    return state;
}