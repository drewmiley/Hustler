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

	describe('has a getById(id) method', () => {

		let match;

		it('should return undefined for non-integer values', () => {
			match = matchAPI.getById();
			expect(match).to.equal(undefined);

			match = matchAPI.getById('one');
			expect(match).to.equal(undefined);

			match = matchAPI.getById(new Date());
			expect(match).to.equal(undefined);

			match = matchAPI.getById(new Match());
			expect(match).to.equal(undefined);
		});

		it('should return undefined for invalid integer values', () => {
			match = matchAPI.getById(0);
			expect(match).to.equal(undefined);

			match = matchAPI.getById(-1);
			expect(match).to.equal(undefined);

			match = matchAPI.getById(11);
			expect(match).to.equal(undefined);
		});

		it('should return the correct match for a valid integer value', () => {
			match = matchAPI.getById(1);
			expect(match).to.deep.equal(new Match(1, 1, 1, 2, 3, 3));

			match = matchAPI.getById(6);
			expect(match).to.deep.equal(new Match(6, 3, 1, 4));

			match = matchAPI.getById(10);
			expect(match).to.deep.equal(new Match(10, 5, 4, 5, 5, 1));
		});

	});

});