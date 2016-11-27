import { expect } from 'chai';
import React from 'react';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';

import gameWeeks from '../../../mock/db/gameWeeks';
import matches from '../../../mock/db/matches';
import players from '../../../mock/db/players';

import FixtureGrid from '../../../src/web/components/FixtureGrid';

describe('FixtureGrid', () => {

	const api = {
		gameweek: {
			getByWeekNumber: (() => gameWeeks[0])
		},
		match: {
			getForPair: (() => matches[0])
		},
		player: {
			get: (() => players)
		}
	};

	const component = renderIntoDocument(
		<FixtureGrid
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

	it('should render th equal to two times the length of the players plus 1', () => {
		const th = scryRenderedDOMComponentsWithTag(component, 'th');
		expect(th.length).to.equal(2 * players.length + 1);
	});

	it('should render td equal to the square of the length of the players', () => {
		const td = scryRenderedDOMComponentsWithTag(component, 'td');
		expect(td.length).to.equal(players.length * players.length);
	});

	it('should not display the fixture grid when show is set to false', () => {
		const hiddenComponent = renderIntoDocument(
			<FixtureGrid
				api={api}
				show={false} />
		);

		const div = scryRenderedDOMComponentsWithTag(hiddenComponent, 'div');
		expect(div[0].style.display).to.equal('none');
	});

});