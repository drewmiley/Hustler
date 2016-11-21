let Matches;

export const set = (matches) => {
	Matches = matches;
};

export const get = () => {
	return Matches;
};

export const getById = id => {
	return Matches.find(match => match.id === id);
};