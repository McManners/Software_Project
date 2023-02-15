import React, { useRef, useState } from 'react';
import './minicalendar.css';
import { firstDayOfMonth, getDaysPerMonth } from './Functions/DateInfo';
import NavArrow from './Components/NavArrow';

const MiniCalendar = ({ miniCalendarOpen, setMiniCalendarOpen, setFilterDate }) => {

    const [highlight, setHighlight] = useState(null);
    const date = new Date();
    const [currentDateSelected, setCurrentDateSelected] = useState({ Day: 1, Month: date.getMonth() + 1, Year: date.getFullYear() });
    
    const [dateSelected, setDateSelected] = useState([]);
    
    if (!miniCalendarOpen) return;

    const handleDateSelect = (clickedDate) => {
        if (dateSelected.length === 2) {
            setDateSelected([clickedDate]);
            return;
        }
        if (dateSelected.length === 1 && dateIsEqual(clickedDate, dateSelected[0])) {
            setDateSelected([clickedDate, clickedDate]);
            return;
        }
        if (dateSelected.length === 0) {
            setDateSelected([clickedDate]);
            return;
        }
        if (!dateSelected.includes(clickedDate)) {
            dateIsLessThan(clickedDate, dateSelected[0]) ?
            setDateSelected(prev => [clickedDate, ...prev]) : setDateSelected(prev => [...prev, clickedDate]);
            return;
        } else {
            setDateSelected(prev => prev.filter(e => e !== clickedDate));
        }
    }
    const monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const isDateSelected = (selectedDate) => {
        if (dateSelected.length === 0) return ( <div className='CalendarSelection'></div> );
        if (dateSelected.length === 1) {
            if (!dateIsEqual(selectedDate, highlight)) {
                if (dateIsGreaterThan(selectedDate, dateSelected[0]) && dateIsLessThan(selectedDate, highlight)) {
                    return (
                        <div className='CalendarSelection CalendarSelection--segment'></div>
                    )
                }
                if (dateIsLessThan(selectedDate, dateSelected[0]) && dateIsGreaterThan(selectedDate, highlight)) {
                    return (
                        <div className='CalendarSelection CalendarSelection--segment'></div>
                    )
                }
            }
            if (dateIsEqual(selectedDate, highlight)) {
                if (dateIsGreaterThan(selectedDate, dateSelected[0])) {
                    return (
                        <div className='CalendarSelection CalendarSelection--end'></div>
                    )
                }
                if (dateIsLessThan(selectedDate, dateSelected[0])) {
                    return (
                        <div className='CalendarSelection CalendarSelection--start'></div>
                    )
                }
            }
            if ((dateIsLessThan(selectedDate, dateSelected[0]) && dateIsGreaterThan(selectedDate, highlight)) || (dateIsGreaterThan(selectedDate, dateSelected[0]) && dateIsLessThan(selectedDate, highlight))) {
                return (
                    <div className='CalendarSelection CalendarSelection--segment'></div>
                )
            } else if (dateIsEqual(selectedDate, dateSelected[0])) {
                if (dateIsLessThan(selectedDate, highlight)) {
                    return (
                        <div className='CalendarSelection CalendarSelection--start'></div>
                    )
                } else if (dateIsGreaterThan(selectedDate, highlight)) {
                    return (
                        <div className='CalendarSelection CalendarSelection--end'></div>
                    )
                }
            }
        }
        if ((dateSelected.length === 1 && dateIsEqual(selectedDate, dateSelected[0])) 
            || (dateSelected.length === 2 && dateIsEqual(selectedDate, dateSelected[0]) && dateIsEqual(selectedDate, dateSelected[1]))) {
            return (
                <div className='CalendarSelection CalendarSelection--single'></div>
            )
        } else if (dateSelected.length === 2) {
            if (dateIsEqual(selectedDate, dateSelected[0])) {
                return (
                    <div className='CalendarSelection CalendarSelection--start'></div>
                )
            } else if (dateIsEqual(selectedDate, dateSelected[1])) {
                return (
                    <div className='CalendarSelection CalendarSelection--end'></div>
                )
            } else if (dateIsGreaterThan(selectedDate, dateSelected[0]) && dateIsLessThan(selectedDate, dateSelected[1])) {
                return (
                    <div className='CalendarSelection CalendarSelection--segment'></div>
                )
            }
        }
        return ( <div className='CalendarSelection'></div> )
    }

    const dateIsGreaterThan = (dateOne, dateTwo) => {
        if (dateOne.Year > dateTwo.Year) return true;
        if (dateOne.Year < dateTwo.Year) return false;
        if (dateOne.Month > dateTwo.Month) return true;
        if (dateOne.Month < dateTwo.Month) return false;
        if (dateOne.Year === dateTwo.Year && dateOne.Month === dateTwo.Month && dateOne.Day > dateTwo.Day) return true;
        return false;
    }
    const dateIsLessThan = (dateOne, dateTwo) => {
        if (dateOne.Year < dateTwo.Year) return true;
        if (dateOne.Year > dateTwo.Year) return false;
        if (dateOne.Month < dateTwo.Month) return true;
        if (dateOne.Month > dateTwo.Month) return false;
        if ((dateOne.Year === dateTwo.Year) && (dateOne.Month === dateTwo.Month) && (dateOne.Day < dateTwo.Day)) return true;
        return false;
    }
    const dateIsEqual = (dateOne, dateTwo) => {
        return (dateOne.Year === dateTwo.Year && dateOne.Month === dateTwo.Month && dateOne.Day === dateTwo.Day);
    }

    const getMonthTableBody = () => {
        let monthEndDay = getDaysPerMonth(currentDateSelected);
        let month = [];
        for (let k = 1; k <= monthEndDay; k++) {
            let newDate = { 
                Day: k, 
                Month: currentDateSelected.Month,
                Year: currentDateSelected.Year
            };
            month.push(
                <td className='Date' key={'current-date-' + k + '-' + newDate} onClick={() => handleDateSelect(newDate)} onMouseOver={() => handleHighlightOn(newDate)} onMouseLeave={handleHighlightOff}>
                    <div className='FullDateState'></div>
                    <span className='DateLabel'>{newDate.Day}</span>
                    {isDateSelected(newDate)}
                </td>
            )
        }
        let dayOne = firstDayOfMonth(currentDateSelected);
        for (let k = 0; k < dayOne; k++) {
            let newDate = { 
                Day: getDaysPerMonth({
                    Day: 1,
                    Month: (currentDateSelected.Month === 1) ? 12 : currentDateSelected.Month - 1,
                    Year: (currentDateSelected.Month === 1) ? currentDateSelected.Year - 1 : currentDateSelected.Year
                }) - k,
                Month: (currentDateSelected.Month === 1) ? 12 : currentDateSelected.Month - 1,
                Year: (currentDateSelected.Month === 1) ? currentDateSelected.Year - 1 : currentDateSelected.Year
            };
            month.unshift(
                <td className='Date OtherMonth' key={'hi' + k} onClick={() => handleDateSelect(newDate)} onMouseOver={() => handleHighlightOn(newDate)} onMouseLeave={() => handleHighlightOff(newDate)}>
                    <div className='FullDateState'></div>
                    <span className='DateLabel'>{newDate.Day}</span>
                    {isDateSelected(newDate)}
                </td>
            )
        }
        let remainingDays = (month.length % 7 === 0) ? 0 : (7 - (month.length % 7));
        for (let k = 0; k < remainingDays; k++) {
            let newDate = { 
                Day: k + 1, 
                Month: (currentDateSelected.Month === 12) ? 1 : currentDateSelected.Month + 1,
                Year: (currentDateSelected.Month === 12) ? currentDateSelected.Year + 1 : currentDateSelected.Year
            };
            month.push(
                <td className='Date OtherMonth' key={'bye' + k} onClick={() => handleDateSelect(newDate)} onMouseOver={() => handleHighlightOn(newDate)} onMouseLeave={() => handleHighlightOff(newDate)}>
                    <div className='FullDateState'></div>
                    <span className='DateLabel'>{newDate.Day}</span>
                    {isDateSelected(newDate)}
                </td>
            )
        }

        let tableRows = [];
        let totalRows = month.length / 7;
        for (let row = 0; row < totalRows; row++) {
            tableRows.push(
                <tr key={`row-id-${row}`}>
                    {getWeek(month, row)}
                </tr>
            )
        }
        return (
            <tbody>
                {tableRows.map(row => {
                    return (
                        row
                    )
                })}
            </tbody>
        )
    }
    const getWeek = (month, row) => {
        let week = [];
        for (let i = 0; i < 7; i++) {
            week.push(
                month[(row * 7) + i]
            )
        }
        return week;
    }
    const handleHighlightOn = (day) => {
        setHighlight(day);
    }
    const handleHighlightOff = () => {
        setHighlight({});
    }
    const getStartDate = () => {
        if (dateSelected.length !== 2) return '';
        let month = dateSelected[0].Month > 9 ? dateSelected[0].Month : '0' + dateSelected[0].Month;
        let day = dateSelected[0].Day > 9 ? dateSelected[0].Day : '0' + dateSelected[0].Day;
        return `${month}/${day}/${dateSelected[0].Year}`
    }
    const getEndDate = () => {
        if (dateSelected.length !== 2) return '';
        let month = dateSelected[1].Month > 9 ? dateSelected[1].Month : '0' + dateSelected[1].Month;
        let day = dateSelected[1].Day > 9 ? dateSelected[1].Day : '0' + dateSelected[1].Day;
        return `${month}/${day}/${dateSelected[1].Year}`
    }
    const handleRetrieveClick = () => {
        setFilterDate(dateSelected);
        setMiniCalendarOpen(false);
    }
    
    const QuickSelect = () => {
        return (
            <div className='QuickSelect'>
                <div className='QuickSelectButton' onClick={() => handleQuickSelectClick('today')}>Today</div>
                <div className='QuickSelectButton' onClick={() => handleQuickSelectClick('yesterday')}>Yesterday</div>
                <div className='QuickSelectButton' onClick={() => handleQuickSelectClick('week-to-date')}>Week-to-date</div>
                <div className='QuickSelectButton' onClick={() => handleQuickSelectClick('last-week')}>Last Week</div>
                <div className='QuickSelectButton' onClick={() => handleQuickSelectClick('last-seven-days')}>Last 7 days</div>
                <div className='QuickSelectButton' onClick={() => handleQuickSelectClick('month-to-date')}>Month-to-date</div>
                <div className='QuickSelectButton' onClick={() => handleQuickSelectClick('last-month')}>Last Month</div>
                <div className='QuickSelectButton' >Last 30 Days</div>
                <div className='QuickSelectButton' onClick={() => handleQuickSelectClick('this-year')}>This Year</div>
                <div className='QuickSelectButton' onClick={() => handleQuickSelectClick('last-year')}>Last Year</div>
            </div>
        )
    }
    const handleQuickSelectClick = (type) => {
        const current_date = {
            Day: date.getDate(),
            Month: date.getMonth() + 1,
            Year: date.getFullYear()
        };
        const yesterday = {
            Day: (date.getDate() === 1) ? getDaysPerMonth({
                Day: 1,
                Month: (date.getMonth() === 0) ? 12 : date.getMonth(),
                Year: (date.getMonth() === 0) ? date.getFullYear() - 1 : date.getFullYear()
            }) : date.getDate() - 1,
            Month: (date.getDate() === 1) ? (date.getMonth() === 0) ? 12 : date.getMonth() + 1 : date.getMonth() + 1,
            Year: (date.getMonth() === 0) ? (date.getDate() === 1) ? date.getFullYear() - 1 : date.getFullYear() : date.getFullYear()
        };
        const first_day_of_month = firstDayOfMonth({
            Day: date.getDate(),
            Month: date.getMonth() + 1,
            Year: date.getFullYear()
        });
        const current_day_of_week = ((date.getDate() % 7)) + first_day_of_month;
        const prevMonth = {
            Day: 1,
            Month: (date.getMonth() === 0) ? 12 : date.getMonth(),
            Year: (date.getMonth() === 0) ? date.getFullYear() - 1 : date.getFullYear()
        };
        const days_per_prev_month = getDaysPerMonth(prevMonth);

        const sunday_date = date.getDate() - current_day_of_week + 1;
        const first_date_of_current_week = {
            Day: sunday_date,
            Month: date.getMonth() + 1,
            Year: date.getFullYear()
        };
        

        switch (type) {
            case 'today':
                setCurrentDateSelected({ Day: 1, Month: date.getMonth() + 1, Year: date.getFullYear() });
                setDateSelected([{ Day: date.getDate(), Month: date.getMonth() + 1, Year: date.getFullYear() }, { Day: date.getDate(), Month: date.getMonth() + 1, Year: date.getFullYear() }]);
                break;
            case 'yesterday':
                setCurrentDateSelected({
                    Day: 1,
                    Month: (date.getDate() === 1) ? (date.getMonth() === 0) ? 12 : date.getMonth() : date.getMonth() + 1,
                    Year: (date.getMonth() === 0) ? (date.getDate() === 1) ? date.getFullYear() - 1 : date.getFullYear() : date.getFullYear()
                });
                setDateSelected([yesterday, yesterday]);
                break;
            case 'week-to-date':
                setCurrentDateSelected(current_date);
                setDateSelected([
                    first_date_of_current_week,
                    current_date
                ]);
                break;
            case 'month-to-date':
                setCurrentDateSelected({
                    Day: 1,
                    Month: date.getMonth() + 1,
                    Year: date.getFullYear()
                });
                setDateSelected([
                    {
                        Day: 1,
                        Month: date.getMonth() + 1,
                        Year: date.getFullYear()
                    },
                    {
                        Day: date.getDate(),
                        Month: date.getMonth() + 1,
                        Year: date.getFullYear()
                    }
                ]);
                break;
            case 'last-month':
                setCurrentDateSelected({
                    Day: 1,
                    Month: (date.getMonth() === 0) ? 12 : date.getMonth(),
                    Year: (date.getMonth() === 0) ? date.getFullYear() - 1 : date.getFullYear()
                });
                setDateSelected([
                    {
                        Day: 1,
                        Month: (date.getMonth() === 0) ? 12 : date.getMonth(),
                        Year: (date.getMonth() === 0) ? date.getFullYear() - 1 : date.getFullYear()
                    },
                    {
                        Day: getDaysPerMonth({
                            Day: 1,
                            Month: (date.getMonth() === 0) ? 12 : date.getMonth(),
                            Year: (date.getMonth() === 0) ? date.getFullYear() - 1 : date.getFullYear()
                        }),
                        Month: (date.getMonth() === 0) ? 12 : date.getMonth(),
                        Year: (date.getMonth() === 0) ? date.getFullYear() - 1 : date.getFullYear()
                    }
                ]);
                break;
            case 'last-seven-days':
                setCurrentDateSelected({
                    Day: 1,
                    Month: date.getMonth() + 1,
                    Year: date.getFullYear()
                });
                const d = date.getDate();
                if (d > 6) {
                    console.log('yeah')
                    setDateSelected([ { Day: d - 6, Month: date.getMonth() + 1, Year: date.getFullYear() },
                        { Day: d, Month: date.getMonth() + 1, Year: date.getFullYear() }
                    ]);
                } else {
                    setDateSelected([ { Day: days_per_prev_month - (6 - d), Month: (date.getMonth() === 0) ? 12 : date.getMonth(), Year: (date.getMonth() === 0) ? date.getFullYear() - 1 : date.getFullYear() },
                        { Day: d, Month: date.getMonth() + 1, Year: date.getFullYear() }
                    ])
                }
                break;
            // case 'year-to-date':
            //     setCurrentDateSelected({
            //         Day: 1,
            //         Month: date.getMonth() + 1,
            //         Year: date.getFullYear()
            //     });
            //     setDateSelected([
            //         {
            //             Day: 1,
            //             Month: 1,
            //             Year: date.getFullYear()
            //         }, {
            //             Day: 1,
            //             Month: date.getMonth() + 1,
            //             Year: date.getFullYear()
            //         }
            //     ]);
            //     break;
            case 'last-year':
                setCurrentDateSelected({
                    Day: 1,
                    Month: 12,
                    Year: date.getFullYear() - 1
                });
                setDateSelected([
                    {
                        Day: 1,
                        Month: 1,
                        Year: date.getFullYear() - 1
                    }, {
                        Day: 31,
                        Month: 12,
                        Year: date.getFullYear() - 1
                    }
                ]);
                break;
            case 'last-week':
                let combine_dates = days_per_prev_month + date.getDate();
                let prev_saturday_date = combine_dates - (date.getDate() % 7);
                let most_recent_sunday = prev_saturday_date - 6;
                let is_saturday_current_month = (days_per_prev_month - prev_saturday_date) < 0; // true is current month
                let is_sunday_current_month = (days_per_prev_month - most_recent_sunday) < 0;
                let sunday_start;
                if (is_sunday_current_month) {
                    sunday_start = {
                        Day: most_recent_sunday - days_per_prev_month,
                        Month: date.getMonth() + 1,
                        Year: date.getFullYear()
                    }
                } else {
                    sunday_start = {
                        Day: most_recent_sunday,
                        Month: (date.getMonth() === 0) ? 12 : date.getMonth(),
                        Year: (date.getMonth() === 0) ? date.getFullYear() - 1 : date.getFullYear()
                    }
                }
                let end_date;
                if (is_saturday_current_month) {
                    end_date = {
                        Day: prev_saturday_date - days_per_prev_month,
                        Month: date.getMonth() + 1,
                        Year: date.getFullYear()
                    }
                } else {
                    end_date = {
                        Day: prev_saturday_date,
                        Month: (date.getMonth() === 0) ? 12 : date.getMonth(),
                        Year: (date.getMonth() === 0) ? date.getFullYear() - 1 : date.getFullYear()
                    }
                }
                setCurrentDateSelected(( is_saturday_current_month ) ? current_date : prevMonth);
                setDateSelected( [sunday_start, end_date] );
                break;
            case 'this-year':
                setCurrentDateSelected(current_date);
                setDateSelected([ { Day: 1, Month: 1, Year: date.getFullYear() }, current_date ]);
                break;
        }
    }
    return (
        <div className='mini-calendar'>
            <div className='container'>
                <div className='Main'>
                    <div className='Left'>
                        <div className='Month' key={'month'}>
                            <div><NavArrow direction='left' setCurrentDateSelected={setCurrentDateSelected} currentDateSelected={currentDateSelected} /></div>
                            <span>{`${monthString[currentDateSelected.Month - 1]} ${currentDateSelected.Year}`}</span>
                            <NavArrow direction='right' setCurrentDateSelected={setCurrentDateSelected} currentDateSelected={currentDateSelected} />
                        </div>
                        <table className='CalendarTable'>
                            <thead>
                                <tr className='WeekDayHeading'>
                                    <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
                                </tr>
                            </thead>
                            {getMonthTableBody()}
                        </table>
                        <div className='DateRange'>
                            <div className='StartDate'>
                                <label htmlFor='start-date'>
                                    Start Date
                                    <input type='text' id='start-date' value={getStartDate()} />
                                </label>
                                
                            </div>
                            <div className='EndDate'>
                                <label htmlFor='end-date'>
                                    End Date
                                    <input type='text' id='end-date' value={getEndDate()} />
                                </label>
                            </div>
                        </div>
                    </div>
                    <QuickSelect />
                </div>
                <div className='Options'>
                    <button type='button' className='Cancel' onClick={() => setMiniCalendarOpen(false)}>Cancel</button>
                    <button type='button' className='Retrieve' onClick={handleRetrieveClick}>Retrieve</button>
                </div>
            </div>
        </div>
    )
}

export default MiniCalendar;