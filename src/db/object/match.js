export default (id, gameWeek, homePlayerID, awayPlayerID, homeScore, awayScore) => {
    return {
    	id,
    	gameWeek,
    	homePlayerID,
    	awayPlayerID,
    	homeScore,
    	awayScore,
    	isPlayed: (() => homeScore !== undefined && awayScore !== undefined)()
    };
};