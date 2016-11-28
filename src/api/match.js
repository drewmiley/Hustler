let Matches;

const _isPlayedCondition = (isPlayed) => {
	return (isPlayed === true || isPlayed === false) ? ((match) => match.isPlayed === isPlayed) : (() => true); 
};

export const set = (matches) => {
	Matches = matches;
};

export const get = () => {
	return Matches;
};

export const getById = (id) => {
	return Matches.find(match => match.id === id);
};

export const getForPlayer = (playerId, isPlayed) => {
	const isPlayedCondition = _isPlayedCondition(isPlayed);
	return Matches.filter(match => (match.homePlayerID === playerId || match.awayPlayerID === playerId) && isPlayedCondition(match));
};

export const getForPair = (playerIds) => {
	return Object.prototype.toString.call(playerIds) === '[object Array]' && playerIds.length === 2 ?
		Matches.find(match => {
			return (match.homePlayerID === playerIds[0] && match.awayPlayerID === playerIds[1]) ||
				(match.homePlayerID === playerIds[1] && match.awayPlayerID === playerIds[0])
		}) : undefined;
};