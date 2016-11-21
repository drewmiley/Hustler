import * as gameweek from './gameweek';
import * as match from './match';
import * as player from './player';

import gameWeeks from '../db/gameWeeks';
import matches from '../db/matches';
import players from '../db/players';

gameweek.set(gameWeeks);
match.set(matches);
player.set(players);

export default {
	gameweek,
	match,
	player
};