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

	describe('has a getById(id) method', () => {

		let player;

		it('should return undefined for non-integer values', () => {
			player = playerAPI.getById();
			expect(player).to.equal(undefined);

			player = playerAPI.getById('one');
			expect(player).to.equal(undefined);

			player = playerAPI.getById(new Date());
			expect(player).to.equal(undefined);

			player = playerAPI.getById(new Player());
			expect(player).to.equal(undefined);
		});

		it('should return undefined for invalid integer values', () => {
			player = playerAPI.getById(0);
			expect(player).to.equal(undefined);

			player = playerAPI.getById(-1);
			expect(player).to.equal(undefined);

			player = playerAPI.getById(6);
			expect(player).to.equal(undefined);
		});

		it('should return the correct player for a valid integer value', () => {
			player = playerAPI.getById(1);
			expect(player).to.deep.equal(new Player(1, 'Drew'));

			player = playerAPI.getById(5);
			expect(player).to.deep.equal(new Player(5, 'Bob'));
		});

	});

});