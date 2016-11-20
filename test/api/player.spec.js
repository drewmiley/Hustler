import { expect } from 'chai';

import players from '../../mock/db/players';

import * as playerAPI from '../../src/api/player';
import Player from '../../src/db/object/player';

describe('api/player', () => {

	before(() => {
		playerAPI.set(players);
	});

	it('has a get() method', () => {

		const allPlayers = playerAPI.get();

		expect(allPlayers).to.deep.equal([
			new Player(1, 'Drew'),
			new Player(2, 'Miley'),
			new Player(3, 'James'),
			new Player(4, 'William'),
			new Player(5, 'Bob')
		]);

	});

});