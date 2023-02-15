
export function firstDayOfMonth(date) {
    const yearSubString = parseInt(date.Year.toString().substring(2, 4));
    // console.log(yearSubString)
    const yearCode = (yearSubString + (Math.floor(yearSubString / 4))) % 7;
    const monthCode = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];
    // const centuryCode = [4, 2, 0, 6, 4, 2, 0];
    // 1700 => 4, 2300 => 0
    const centuryCode = (date.Year < 2000 && date.Year > 1899) ? 
        0 : (date.Year < 3000 && date.Year > 1999) ? 6 : 0;
    const leapYear = ((date.Year % 4 === 0 || date.Year % 400 === 0) && date.Year % 100 !== 0 ) ? 1 : 0;
    return (yearCode + monthCode[date.Month - 1] + centuryCode + 1 - leapYear) % 7;
}

export function formatTime(militaryTime) {
    const hour = parseInt(militaryTime.split(':')[0])
    const code = hour > 11 ? 'PM' : 'AM';
    return `${hour > 12 ? hour - 12 : hour}: ${militaryTime.split(':')[1]} ${code}`;
}

export function getDaysPerMonth(date) {
    const leapYear = (date.Year % 4 === 0 || date.Year % 400 === 0) && (date.Year % 100 !== 0);
    if (leapYear && date.Month === 2) return 29;
    
    const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysPerMonth[date.Month - 1];

}