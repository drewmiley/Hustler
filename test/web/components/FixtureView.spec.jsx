import { expect } from 'chai';
import React from 'react';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';

import FixtureView from '../../../src/web/components/FixtureView';

describe('FixtureView', () => {

	const match = {
		formattedDate: '17/8',
		homePlayer: 'Drew',
		awayPlayer: 'Miley',
		homeScore: 3,
		awayScore: 3
	};

	const component = renderIntoDocument(
		<FixtureView match={match} />
	);

	it('should render a table row', () => {
		const row = scryRenderedDOMComponentsWithTag(component, 'tr');
		expect(row.length).to.equal(1);
	});

	it('should render 6 table column', () => {
		const columns = scryRenderedDOMComponentsWithTag(component, 'td');
		expect(columns.length).to.equal(6);
	})

	it('should display the formatted date in the first column', () => {
		const columns = scryRenderedDOMComponentsWithTag(component, 'td');
		expect(columns[0].textContent).to.equal('17/8');
	});

	it('should display the home player name in the second column', () => {
		const columns = scryRenderedDOMComponentsWithTag(component, 'td');
		expect(columns[1].textContent).to.equal('Drew');
	});

	it('should display the home score in the third column', () => {
		const columns = scryRenderedDOMComponentsWithTag(component, 'td');
		expect(columns[2].textContent).to.equal('3');
	});

	it('should display a V in the fourth column', () => {
		const columns = scryRenderedDOMComponentsWithTag(component, 'td');
		expect(columns[3].textContent).to.equal('V');
	});

	it('should display the away score in the fifth column', () => {
		const columns = scryRenderedDOMComponentsWithTag(component, 'td');
		expect(columns[4].textContent).to.equal('3');
	});

	it('should display the away player name in the sizth column', () => {
		const columns = scryRenderedDOMComponentsWithTag(component, 'td');
		expect(columns[5].textContent).to.equal('Miley');
	});

});