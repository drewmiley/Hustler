import { expect } from 'chai';
import {
	List,
	Map,
	fromJS
} from 'immutable';

import * as actions from '../../../src/web/constants/actions';

import reducer from '../../../src/web/reducers/hustler';

describe('web/reducer/hustler', () => {

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

	describe('SET_DISPLAYED_DIV', () => {

		const displayedDiv = 'div';
		const action = {
			type: actions.SET_DISPLAYED_DIV,
			option: displayedDiv
		};

		it('handles SET_DISPLAYED_DIV with no initial value', () => {
			const presetInitialState = Map({
				displayClasses: Map({
					selected: undefined
				})
			});
			const nextState = reducer(presetInitialState, action);

			expect(nextState.get('displayClasses').get('selected')).to.equal(displayedDiv);
		});

		it('handles SET_DISPLAYED_DIV with an initial value', () => {
			const presetInitialState = Map({
				displayClasses: Map({
					selected: 'previous'
				})
			});
			const nextState = reducer(presetInitialState, action);

			expect(nextState.get('displayClasses').get('selected')).to.equal(displayedDiv);
		});

	});

});