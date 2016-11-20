import { expect } from 'chai';
import {
	List,
	Map,
	fromJS
} from 'immutable';

import * as actions from '../../../src/web/constants/actions';

import reducer from '../../../src/web/reducers/hustler';

describe('reducer', () => {

	describe('SET_STATE', () => {

		it('handles SET_STATE', () => {
			const initialState = Map();
			const action = {
				type: actions.SET_STATE,
				state: Map({
					list: List.of(
						1,
						2,
						3
					)
				})
			};

			const nextState = reducer(initialState, action);

			expect(nextState.toJS()).to.deep.equal({
				list: [
					1,
					2,
					3
				]
			});
		});

		it('handles SET_STATE without initial state', () => {
			const action = {
				type: actions.SET_STATE,
				state: Map({
					list: List.of(
						1,
						2,
						3
					)
				})
			};

			const nextState = reducer(undefined, action);

			expect(nextState.toJS()).to.deep.equal({
				list: [
					1,
					2,
					3
				]
			});
		});

		it('handles SET_STATE with plain js payload', () => {
			const initialState = Map();
			const action = {
				type: actions.SET_STATE,
				state: {
					list: [
						1,
						2,
						3
					]
				}
			};

			const nextState = reducer(initialState, action);

			expect(nextState.toJS()).to.deep.equal({
				list: [
					1,
					2,
					3
				]
			});
		});

		it('handles SET_STATE with plain js payload and without initial state', () => {
			const action = {
				type: actions.SET_STATE,
				state: {
					list: [
						1,
						2,
						3
					]
				}
			};

			const nextState = reducer(undefined, action);

			expect(nextState.toJS()).to.deep.equal({
				list: [
					1,
					2,
					3
				]
			});
		});

	});

});