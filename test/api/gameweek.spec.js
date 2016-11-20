import { expect } from 'chai';

import gameWeekDates from '../../mock/db/gameWeekDates';

import * as gameweekAPI from '../../src/api/gameweek';

describe('api/gameweek', () => {

	before(() => {
		gameweekAPI.set(gameWeekDates);
	});

	it('has a get() method', () => {
		const allGameWeeks = gameweekAPI.get();

		expect(allGameWeeks[0]).to.equalDate(new Date('2016-08-17'));
		expect(allGameWeeks[1]).to.equalDate(new Date('2016-08-24'));
		expect(allGameWeeks[2]).to.equalDate(new Date('2016-08-31'));
		expect(allGameWeeks[3]).to.equalDate(new Date('2016-09-07'));
		expect(allGameWeeks[4]).to.equalDate(new Date('2016-09-14'));
	});

});