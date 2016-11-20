import { expect } from 'chai';

import matches from '../../mock/db/matches';

import * as matchAPI from '../../src/api/match';
import Match from '../../src/db/object/match';

describe('api/match', () => {

	before(() => {
		matchAPI.set(matches);
	});

	it('has a get() method', () => {

		const allMatches = matchAPI.get();

		expect(allMatches).to.deep.equal([
			new Match(1, 1, 1, 2, 3, 3),
			new Match(2, 1, 3, 4),
			new Match(3, 2, 5, 1),
			new Match(4, 2, 4, 2, 2, 4),
			new Match(5, 3, 5, 3, 0, 'W'),
			new Match(6, 3, 1, 4),
			new Match(7, 4, 3, 1, 0, 6),
			new Match(8, 4, 2, 5),
			new Match(9, 5, 2, 3),
			new Match(10, 5, 4, 5, 5, 1)
		]);

	});

});