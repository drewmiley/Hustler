import { expect } from 'chai';
import React from 'react';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';

import gameWeeks from '../../../mock/db/gameWeeks';
import matches from '../../../mock/db/matches';
import players from '../../../mock/db/players';

import LeagueTable from '../../../src/web/components/LeagueTable';

describe('LeagueTable', () => {

	const api = {
		gameweek: {
			getByWeekNumber: (() => gameWeeks[0])
		},
		match: {
			get: (() => matches),
			getForPlayer: (() => matches)
		},
		player: {
			get: (() => players)
		}
	};

	const component = renderIntoDocument(
		<LeagueTable
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

	it('should render a tbody', () => {
		const tbody = scryRenderedDOMComponentsWithTag(component, 'tbody');
		expect(tbody.length).to.equal(1);
	});

	it('should render tr equal to the length of the players plus 1', () => {
		const tr = scryRenderedDOMComponentsWithTag(component, 'tr');
		expect(tr.length).to.equal(players.length + 1);
	});

	it('should render 10 th columns plus one for each player', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th.length).to.equal(players.length + 10);
	});

	it('should render P in the second th column', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th[1].textContent).to.equal('P');
	});

	it('should render W in the third th column', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th[2].textContent).to.equal('W');
	});

	it('should render D in the fourth th column', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th[3].textContent).to.equal('D');
	});

	it('should render L in the fifth th column', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th[4].textContent).to.equal('L');
	});

	it('should render F in the sixth th column', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th[5].textContent).to.equal('F');
	});

	it('should render A in the seventh th column', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th[6].textContent).to.equal('A');
	});

	it('should render +/- in the eighth th column', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th[7].textContent).to.equal('+/-');
	});

	it('should render B in the ninth th column', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th[8].textContent).to.equal('B');
	});

	it('should render Pts in the tenth th column', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th[9].textContent).to.equal('Pts');
	});

	it('should render td equal to the 9 times length of the players', () => {
		const td = scryRenderedDOMComponentsWithTag(component, 'td');
		expect(td.length).to.equal(9 * players.length);
	});

	it('should not display the league table when show is set to false', () => {
		const hiddenComponent = renderIntoDocument(
			<LeagueTable
				api={api}
				show={false} />
		);

		const div = scryRenderedDOMComponentsWithTag(hiddenComponent, 'div');
		expect(div[0].style.display).to.equal('none');
	});

});