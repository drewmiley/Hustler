import * as gameweek from './api/gameweek';
import * as match from './api/match';
import * as player from './api/player';

import gameWeekDates from './db/gameWeekDates';
import matches from './db/matches';
import players from './db/players';

gameweek.set(gameWeekDates);
match.set(matches);
player.set(players);

export default {
	gameweek,
	match,
	player
};