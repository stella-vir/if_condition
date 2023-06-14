function calculate(a, b) {
    return a + b;
}

function calculateDaysBetweenDates(begin, end) {
    const beginDate = new Date(begin);
    const endDate = new Date(end);
    const diff = endDate.getTime() - beginDate.getTime();
    const days = diff / (1000 * 3600 * 24);
    return days;
}

// multiply the number of days by the number of hours in a day
function calculateHoursBetweenDates(begin, end) {    
    const hours = calculateDaysBetweenDates(begin, end) * 24;
    return hours;
}   
