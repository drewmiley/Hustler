import {
	List,
	Map
} from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
	compose,
	createStore
} from 'redux';

import db from '../db';

console.log(db);

import * as actions from './constants/actions';

import AppContainer from './containers/AppContainer';

import reducer from './reducers/hustler';

const createStoreDevTools = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreDevTools(reducer);

store.dispatch({
    type: actions.SET_STATE,
    state: {}
})

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);