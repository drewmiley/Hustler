import { expect } from 'chai';
import { Map } from 'immutable';
import React from 'react';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag,
	Simulate
} from 'react-addons-test-utils';

import Menu from '../../../src/web/components/Menu';

describe('Menu', () => {

	const displayClasses = Map({
		options: [
			'one',
			'two'
		]
	});

	describe('Rendering', () => {

		const component = renderIntoDocument(
			<Menu displayClasses={displayClasses} />
		);

		it('should render a btn group of the display classes', () => {
			const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
			expect(buttons.length).to.equal(2);
		});

		it('should display the display class as text on the button', () => {
			const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
			expect(buttons[0].textContent).to.equal('one');
			expect(buttons[1].textContent).to.equal('two');
		});

	});

	describe('Function Callback', () => {

		let buttonSelected = false;

		const setDisplayedDiv = () => buttonSelected = true;

		const component = renderIntoDocument(
			<Menu
				displayClasses={displayClasses}
				setDisplayedDiv={setDisplayedDiv} />
		);

		it('should expect callback when a button is pressed', () => {
			const button = scryRenderedDOMComponentsWithTag(component, 'button');
			Simulate.click(button[0]);

			expect(buttonSelected).to.be.true;
		});

	});

});