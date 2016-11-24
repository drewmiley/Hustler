export default (number, date) => {
    return {
    	number,
    	date,
    	formattedDate: date ? date.getDate() + '/' + (date.getMonth() + 1) : undefined
    };
};