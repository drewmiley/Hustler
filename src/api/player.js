let Players;

export const set = (players) => {
	Players = players;
};

export const get = () => {
	return Players;
};

export const getById = id => {
	return Players.find(player => player.id === id);
};