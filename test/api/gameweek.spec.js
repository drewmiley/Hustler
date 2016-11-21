import { expect } from 'chai';

import gameWeeks from '../../mock/db/gameWeeks';

import * as gameweekAPI from '../../src/api/gameweek';
import GameWeek from '../../src/db/object/gameWeek';

describe('api/gameweek', () => {

	before(() => {
		gameweekAPI.set(gameWeeks);
	});

	it('has a get() method', () => {
		const allGameWeeks = gameweekAPI.get();

		expect(allGameWeeks[0].number).to.equal(1);
		expect(allGameWeeks[0].date).to.equalDate(new Date('2016-08-17'));
		expect(allGameWeeks[1].number).to.equal(2);
		expect(allGameWeeks[1].date).to.equalDate(new Date('2016-08-24'));
		expect(allGameWeeks[2].number).to.equal(3);
		expect(allGameWeeks[2].date).to.equalDate(new Date('2016-08-31'));
		expect(allGameWeeks[3].number).to.equal(4);
		expect(allGameWeeks[3].date).to.equalDate(new Date('2016-09-07'));
		expect(allGameWeeks[4].number).to.equal(5);
		expect(allGameWeeks[4].date).to.equalDate(new Date('2016-09-14'));
	});

	describe('has a getByDate(date) method', () => {

		let gameWeek;

		it('should return undefined for non-date values', () => {
			gameWeek = gameweekAPI.getByDate();
			expect(gameWeek).to.equal(undefined);

			gameWeek = gameweekAPI.getByDate('one');
			expect(gameWeek).to.equal(undefined);

			gameWeek = gameweekAPI.getByDate(0);
			expect(gameWeek).to.equal(undefined);
		});

		it('should return a 0 gameweek for earlier date values', () => {
			gameWeek = gameweekAPI.getByDate(new Date('2016-08-16'));
			expect(gameWeek.number).to.equal(0);
		});

		it('should return the week number directly on a date if it is an exact match', () => {
			gameWeek = gameweekAPI.getByDate(new Date('2016-08-17'));
			expect(gameWeek.number).to.equal(1);
			expect(gameWeek.date).to.equalDate(new Date('2016-08-17'));

			gameWeek = gameweekAPI.getByDate(new Date('2016-09-14'));
			expect(gameWeek.number).to.equal(5);
			expect(gameWeek.date).to.equalDate(new Date('2016-09-14'));
		});

		it('should return the week number directly before a date if it is not an exact match', () => {
			gameWeek = gameweekAPI.getByDate(new Date('2016-08-20'));
			expect(gameWeek.number).to.equal(1);
			expect(gameWeek.date).to.equalDate(new Date('2016-08-17'));

			gameWeek = gameweekAPI.getByDate(new Date('2016-09-17'));
			expect(gameWeek.number).to.equal(5);
			expect(gameWeek.date).to.equalDate(new Date('2016-09-14'));
		});
	});

	describe('has a getByWeekNumber(weekNumber) method', () => {

		let gameWeek;

		it('should return undefined for non-integer values', () => {
			gameWeek = gameweekAPI.getByWeekNumber();
			expect(gameWeek).to.equal(undefined);

			gameWeek = gameweekAPI.getByWeekNumber('one');
			expect(gameWeek).to.equal(undefined);

			gameWeek = gameweekAPI.getByWeekNumber(new Date());
			expect(gameWeek).to.equal(undefined);

			gameWeek = gameweekAPI.getByWeekNumber(1.5);
			expect(gameWeek).to.equal(undefined);
		});

		it('should return undefined for invalid integer values', () => {
			gameWeek = gameweekAPI.getByWeekNumber(0);
			expect(gameWeek).to.equal(undefined);

			gameWeek = gameweekAPI.getByWeekNumber(-1);
			expect(gameWeek).to.equal(undefined);

			gameWeek = gameweekAPI.getByWeekNumber(6);
			expect(gameWeek).to.equal(undefined);
		});

		it('should return the correct date for a valid 1-based integer value', () => {
			gameWeek = gameweekAPI.getByWeekNumber(1);
			expect(gameWeek.number).to.equal(1);
			expect(gameWeek.date).to.equalDate(new Date('2016-08-17'));

			gameWeek = gameweekAPI.getByWeekNumber(5);
			expect(gameWeek.number).to.equal(5);
			expect(gameWeek.date).to.equalDate(new Date('2016-09-14'));
		});

	});

});