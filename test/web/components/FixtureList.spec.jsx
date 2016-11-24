import { expect } from 'chai';
import React from 'react';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';

import gameWeeks from '../../../mock/db/gameWeeks';
import matches from '../../../mock/db/matches';
import players from '../../../mock/db/players';

import FixtureList from '../../../src/web/components/FixtureList';

describe('FixtureList', () => {

	const api = {
		gameweek: {
			getByDate: (() => gameWeeks[0]),
			getByWeekNumber: (() => gameWeeks[0])
		},
		match: {
			get: (() => matches)
		},
		player: {
			get: (() => players)
		}
	};

	const component = renderIntoDocument(
		<FixtureList
			api={api}
			show={true} />
	);

	it('should render a table', () => {
		const table = scryRenderedDOMComponentsWithTag(component, 'table');
		expect(table.length).to.equal(1);
	});

	it('should render a thead', () => {
		const thead = scryRenderedDOMComponentsWithTag(component, 'thead');
		expect(thead.length).to.equal(1);
	});

	it('should render trs equal to number of matches plus 1', () => {
		const tr = scryRenderedDOMComponentsWithTag(component, 'tr');
		expect(tr.length).to.equal(11);
	});

	it('should render 6 th columns', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th.length).to.equal(6);
	});

	it('should render Date in the first th column', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th[0].textContent).to.equal('Date');
	});

	it('should render Home in the second th column', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th[1].textContent).to.equal('Home');
	});

	it('should render nothing in the third th column', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th[2].textContent).to.equal('');
	});

	it('should render V in the fourth th column', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th[3].textContent).to.equal('V');
	});

	it('should render nothing in the fifth th column', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th[4].textContent).to.equal('');
	});

	it('should render Away in the sixth th column', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th[5].textContent).to.equal('Away');
	});

	it('should render a tbody', () => {
		const tbody = scryRenderedDOMComponentsWithTag(component, 'tbody');
		expect(tbody.length).to.equal(1);
	});

	it('should not display the fixture list when show is set to false', () => {
		const hiddenComponent = renderIntoDocument(
			<FixtureList
				api={api}
				show={false} />
		);

		const div = scryRenderedDOMComponentsWithTag(hiddenComponent, 'div');
		expect(div[0].style.display).to.equal('none');
	});

});