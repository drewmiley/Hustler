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

	describe('has a getForPlayer(playerId, [isPlayed]) method', () => {

		let matches;

		it('should return an empty array for non-integer values', () => {
			matches = matchAPI.getForPlayer();
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getForPlayer('one');
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getForPlayer(new Date());
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getForPlayer(new Match());
			expect(matches).to.deep.equal([]);
		});

		it('should return an empty array for invalid integer values', () => {
			matches = matchAPI.getForPlayer(0);
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getForPlayer(-1);
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getForPlayer(6);
			expect(matches).to.deep.equal([]);
		});

		it('should return the correct matches for a valid integer value', () => {
			matches = matchAPI.getForPlayer(1);
			expect(matches).to.deep.equal([new Match(1, 1, 1, 2, 3, 3),
				new Match(3, 2, 5, 1),
				new Match(6, 3, 1, 4),
				new Match(7, 4, 3, 1, 0, 6)]);

			matches = matchAPI.getForPlayer(5);
			expect(matches).to.deep.equal([new Match(3, 2, 5, 1),
				new Match(5, 3, 5, 3, 0, 'W'),
				new Match(8, 4, 2, 5),
				new Match(10, 5, 4, 5, 5, 1)]);
		});

		describe('should return the correct matches for a valid integer value, using optional isPlayed parameter', () => {

			it('should work for isPlayed set as true', () => {
				matches = matchAPI.getForPlayer(1, true);
				expect(matches).to.deep.equal([new Match(1, 1, 1, 2, 3, 3),
					new Match(7, 4, 3, 1, 0, 6)]);

				matches = matchAPI.getForPlayer(5, true);
				expect(matches).to.deep.equal([new Match(5, 3, 5, 3, 0, 'W'),
					new Match(10, 5, 4, 5, 5, 1)]);
			});

			it('should work for isPlayed set as false', () => {
				matches = matchAPI.getForPlayer(1, false);
				expect(matches).to.deep.equal([new Match(3, 2, 5, 1),
					new Match(6, 3, 1, 4)]);

				matches = matchAPI.getForPlayer(5, false);
				expect(matches).to.deep.equal([new Match(3, 2, 5, 1),
					new Match(8, 4, 2, 5)]);
			});

		});

	});

	describe('has a getForPair(playerIds) method', () => {

		let match;

		it('should return undefined for non-integer values', () => {
			match = matchAPI.getForPair();
			expect(match).to.equal(undefined);

			match = matchAPI.getForPair('one');
			expect(match).to.equal(undefined);

			match = matchAPI.getForPair(new Date());
			expect(match).to.equal(undefined);

			match = matchAPI.getForPair(new Match());
			expect(match).to.equal(undefined);

			match = matchAPI.getForPair(0);
			expect(match).to.equal(undefined);

			match = matchAPI.getForPair([]);
			expect(match).to.equal(undefined);
		});

		it('should return undefined for invalid integer values', () => {
			match = matchAPI.getForPair([0, 1]);
			expect(match).to.equal(undefined);

			match = matchAPI.getForPair([1, 0]);
			expect(match).to.equal(undefined);

			match = matchAPI.getForPair([-1, 1]);
			expect(match).to.equal(undefined);

			match = matchAPI.getForPair([1, -1]);
			expect(match).to.equal(undefined);

			match = matchAPI.getForPair([6, 1]);
			expect(match).to.equal(undefined);

			match = matchAPI.getForPair([1, 6]);
			expect(match).to.equal(undefined);
		});

		it('should return the correct match for a valid integer array', () => {
			match = matchAPI.getForPair([1, 5]);
			expect(match).to.deep.equal(new Match(3, 2, 5, 1));

			match = matchAPI.getForPair([5, 1]);
			expect(match).to.deep.equal(new Match(3, 2, 5, 1));

			match = matchAPI.getForPair([2, 4]);
			expect(match).to.deep.equal(new Match(4, 2, 4, 2, 2, 4));

			match = matchAPI.getForPair([4, 2]);
			expect(match).to.deep.equal(new Match(4, 2, 4, 2, 2, 4));
		});

	});

	describe('has a getMatchesForGameWeek(gameWeekNumber, [isPlayed]) method', () => {

		let matches;

		it('should return an empty array for non-integer values', () => {
			matches = matchAPI.getMatchesForGameWeek();
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getMatchesForGameWeek('one');
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getMatchesForGameWeek(new Date());
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getMatchesForGameWeek(new Match());
			expect(matches).to.deep.equal([]);
		});

		it('should return an empty array for invalid integer values', () => {
			matches = matchAPI.getMatchesForGameWeek(0);
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getMatchesForGameWeek(-1);
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getMatchesForGameWeek(6);
			expect(matches).to.deep.equal([]);
		});

		it('should return the correct matches for a valid integer value', () => {
			matches = matchAPI.getMatchesForGameWeek(1);
			expect(matches).to.deep.equal([new Match(1, 1, 1, 2, 3, 3),
				new Match(2, 1, 3, 4)]);

			matches = matchAPI.getMatchesForGameWeek(5);
			expect(matches).to.deep.equal([new Match(9, 5, 2, 3),
				new Match(10, 5, 4, 5, 5, 1)]);
		});

		describe('should return the correct matches for a valid integer value, using optional isPlayed parameter', () => {

			it('should work for isPlayed set as true', () => {
				matches = matchAPI.getMatchesForGameWeek(1, true);
				expect(matches).to.deep.equal([new Match(1, 1, 1, 2, 3, 3)]);

				matches = matchAPI.getMatchesForGameWeek(5, true);
				expect(matches).to.deep.equal([new Match(10, 5, 4, 5, 5, 1)]);
			});

			it('should work for isPlayed set as false', () => {
				matches = matchAPI.getMatchesForGameWeek(1, false);
				expect(matches).to.deep.equal([new Match(2, 1, 3, 4)]);

				matches = matchAPI.getMatchesForGameWeek(5, false);
				expect(matches).to.deep.equal([new Match(9, 5, 2, 3)]);
			});

		});

	});

	describe('has a getMatchesForGameWeeks(gameWeekNumbers, [isPlayed]) method', () => {

		let matches;

		it('should return an empty array for non-integer values', () => {
			matches = matchAPI.getMatchesForGameWeeks();
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getMatchesForGameWeeks('one');
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getMatchesForGameWeeks(new Date());
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getMatchesForGameWeeks(new Match());
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getMatchesForGameWeeks(0);
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getMatchesForGameWeeks([]);
			expect(matches).to.deep.equal([]);			
		});

		it('should return an empty array for invalid integer values', () => {
			matches = matchAPI.getMatchesForGameWeeks([-1]);
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getMatchesForGameWeeks([0]);
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getMatchesForGameWeeks([6]);
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getMatchesForGameWeeks([-1, 0]);
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getMatchesForGameWeeks([6, -1]);
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getMatchesForGameWeeks([0, 6]);
			expect(matches).to.deep.equal([]);

			matches = matchAPI.getMatchesForGameWeeks([-1, 0, 6]);
			expect(matches).to.deep.equal([]);
		});

		it('should return the correct matches for valid integer values', () => {
			matches = matchAPI.getMatchesForGameWeeks([1]);
			expect(matches).to.deep.equal([new Match(1, 1, 1, 2, 3, 3),
				new Match(2, 1, 3, 4)]);

			matches = matchAPI.getMatchesForGameWeeks([5]);
			expect(matches).to.deep.equal([new Match(9, 5, 2, 3),
				new Match(10, 5, 4, 5, 5, 1)]);

			matches = matchAPI.getMatchesForGameWeeks([1, 5]);
			expect(matches).to.deep.equal([new Match(1, 1, 1, 2, 3, 3),
				new Match(2, 1, 3, 4),
				new Match(9, 5, 2, 3),
				new Match(10, 5, 4, 5, 5, 1)]);
		});

		describe('should return the correct matches for valid integer values, using optional isPlayed parameter', () => {

			it('should work for isPlayed set as true', () => {
				matches = matchAPI.getMatchesForGameWeeks([1], true);
				expect(matches).to.deep.equal([new Match(1, 1, 1, 2, 3, 3)]);

				matches = matchAPI.getMatchesForGameWeeks([5], true);
				expect(matches).to.deep.equal([new Match(10, 5, 4, 5, 5, 1)]);

				matches = matchAPI.getMatchesForGameWeeks([1, 5], true);
				expect(matches).to.deep.equal([new Match(1, 1, 1, 2, 3, 3),

					new Match(10, 5, 4, 5, 5, 1)]);
			});

			it('should work for isPlayed set as false', () => {
				matches = matchAPI.getMatchesForGameWeeks([1], false);
				expect(matches).to.deep.equal([new Match(2, 1, 3, 4)]);

				matches = matchAPI.getMatchesForGameWeeks([5], false);
				expect(matches).to.deep.equal([new Match(9, 5, 2, 3)]);

				matches = matchAPI.getMatchesForGameWeeks([1, 5], false);
				expect(matches).to.deep.equal([new Match(2, 1, 3, 4),
					new Match(9, 5, 2, 3)]);
			});

		});

	});

});