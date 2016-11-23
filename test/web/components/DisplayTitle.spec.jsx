import { expect } from 'chai';
import React from 'react';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';

import DisplayTitle from '../../../src/web/components/DisplayTitle';

describe('DisplayTitle', () => {

	const component = renderIntoDocument(
		<DisplayTitle displayedClass={'div'} />
	);

	it('should render a paragraph', () => {
		const paragraph = scryRenderedDOMComponentsWithTag(component, 'p');
		expect(paragraph.length).to.equal(1);
	});

	it('should display the title of the displayed class', () => {
		const paragraph = scryRenderedDOMComponentsWithTag(component, 'p');
		expect(paragraph[0].textContent).to.equal('div');
	});

});