import GameWeek from '../db/object/gameWeek';

let GameWeeks;

export const set = (gameWeeks) => {
	GameWeeks = gameWeeks;
};

export const get = () => {
	return GameWeeks;
};

export const getByDate = (date) => {
	// TODO: Tidy up?
	if (Object.prototype.toString.call(date) !== '[object Date]') {
		return;
	}
	const futureGameWeeks = GameWeeks.filter(gameWeek => gameWeek.date.getTime() <= date.getTime());
	const validWeekNumber = futureGameWeeks.length ? Math.max.apply(Math, futureGameWeeks.map(gameWeek => gameWeek.number)) : 0;
	return validWeekNumber ? GameWeeks.find(gameWeek => gameWeek.number === validWeekNumber) : new GameWeek(0);
};

export const getByWeekNumber = (weekNumber) => {
	return GameWeeks.find(gameWeek => gameWeek.number === weekNumber);
};