import React, { useEffect, useState } from 'react';
import './calendar.css';
import IconBxsLeftArrow from './Icons/IconBxsLeftArrow.tsx';
import IconBxsRightArrow from './Icons/IconBxsRightArrow.tsx';
import IconHalloween from './Icons/IconHalloween.tsx';

const CalendarTest = ({setSelectedDays, selectedDays, setSelectedMonth, selectedMonth, setSelectedYear, selectedYear, calendarType}) => {
    const monthEnum = {
        JANUARY: { days: 31, day: 'January', firstDayOfMonth: 1},
        FEBRUARY: { days: 28, day: 'February', firstDayOfMonth: 1},
        MARCH: { days: 31, day: 'March', firstDayOfMonth: 1},
        APRIL: { days: 30, day: 'April', firstDayOfMonth: 1},
        MAY: { days: 31, day: 'May', firstDayOfMonth: 1},
        JUNE: { days: 30, day: 'June', firstDayOfMonth: 1},
        JULY: { days: 31, day: 'July', firstDayOfMonth: 1},
        AUGUST: { days: 31, day: 'August', firstDayOfMonth: 1},
        SEPTEMBER: { days: 30, day: 'September', firstDayOfMonth: 1},
        OCTOBER: { days: 31, day: 'October', firstDayOfMonth: 1},
        NOVEMBER: { days: 30, day: 'November', firstDayOfMonth: 1},
        DECEMBER: { days: 31, day: 'December', firstDayOfMonth: 1}
    }
    const setStartOfMonth = () => {
        if (selectedYear >= 2022) {
            monthEnum.JANUARY.firstDayOfMonth = 6;
            for (let i = 1; i < Object.entries(monthEnum).length; i++) {
                let total_days = 6; // jan 1 2022 starts on the 6th day starting from 0 (saturday)
                for (let j = 0; j < i; j++) {
                    total_days += Object.entries(monthEnum)[j][1].days;
                }
                Object.entries(monthEnum)[i][1].firstDayOfMonth = total_days % 7;
            }
        }
    }
    // useEffect(() => {
    //     console.log("use effecting");
    //     setStartOfMonth();
    // }, [])
    const handleMonthChangeDecrease = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(prev => prev - 1);
        } else
            setSelectedMonth(prev => prev - 1);
    }
    const handleMonthChangeIncrease = () => {
        if (selectedMonth === 11) {
            setSelectedYear(prev => prev + 1);
            setSelectedMonth(0);
        } else {
            setSelectedMonth(prev => prev + 1);
        }
    }
    const calendarTypeColor = (calendarType === "Manager") ? "#ff2800" : "#f0fff0"
    const handleDayClick = event => {
        if (!selectedDays.includes(event.target.id)) {
            setSelectedDays(prev => [...prev, event.target.id]);
            console.log(calendarTypeColor)
            // event.target.parentElement.style.backgroundColor = calendarTypeColor;
            
            // .currentTarget instead of target to get the listeners element!
            // https://stackoverflow.com/questions/36599473/react-click-on-the-parent-element
        } else {
            setSelectedDays(prev => prev.filter(e => e !== event.target.id));
            // event.target.parentElement.style.backgroundColor = "transparent";
        }
    }
    
    const employeeDaysTest = ['2022-10-09', '2022-10-11']
    const renderMonth = (currMonth) => {
        setStartOfMonth();
        const first_day = Object.entries(monthEnum)[selectedMonth][1].firstDayOfMonth;
        const prev_month_days = Object.entries(monthEnum)[selectedMonth === 0 ? 11 : selectedMonth - 1][1].days;
        const total_days_in_month = Object.entries(monthEnum)[selectedMonth][1].days;
        let month = [];
        if (calendarType === "Manager") {
            console.log("this calendar is for manager");
            for (let i = 1; i < currMonth + 1; i++) {
                month.push(
                    <div className={
                        employeeDaysTest.includes((`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}`)) ? 
                        'day valid-day aspect-ratio' : 'day disabled-day aspect-ratio'
                    } key={`${selectedMonth + 1}${(i < 10 ? `0${i}` : i)}${selectedYear}`} 
                        style={
                            selectedDays.includes(`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}`) ?
                            {backgroundColor: calendarTypeColor} : 
                                employeeDaysTest.includes((`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}`)) ? 
                                    {backgroundColor: '#f0fff0'} : {}
                        }>
                            <div>
                                <div className='day-header'>{i}</div>
                            </div>
                        {
                            employeeDaysTest.includes((`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}`)) ? 
                            <div className='spread' id={`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}`} onClick={handleDayClick}></div> :
                            <div className='spread' id={`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}`}></div>
                        }
                    </div>
                )
            }
        } else {
            console.log("this calendar is not for manager");
            for (let i = 1; i < currMonth + 1; i++) {
                month.push(
                    <div className='day valid-day aspect-ratio' key={`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}`} 
                        style={
                            selectedDays.includes(`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}`) ?
                            {backgroundColor: '#f0fff0'} : {}
                        }>
                        <div>
                            <div className='day-header'>{i}</div>
                        </div>
                            <div className='spread' id={`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}`} onClick={handleDayClick}></div>
                    </div>
                )
            }
        }
        if (selectedMonth === 9) {
            month[30] = (
                <div key={`${selectedYear}-10-31`} className='day aspect-ratio disabled-day'>
                    <div>
                        <div className='day-header'>31</div>
                    </div>
                    <div className='spread' id={`1031${selectedYear}`}>
                        {/* // This extra spread div is an overlay div to solve a couple problems.
                        // It is absolutely positioned over the entire cell... */}
                        <IconHalloween style={{color: "orange"}} width='50px'height='25px' />
                    </div>
                </div> 
            )
        }
        let month_grid_count = 42;
        if (month.length < month_grid_count) {
            for (let beg = 0; beg < first_day; beg++) {
                month.unshift(
                        <div key={beg + "beg"} className='day aspect-ratio disabled-day' style={{opacity: '75%', backgroundColor: 'lightgray'}}>
                            <div className='day-header'>{prev_month_days - beg}</div>
                        </div>
                );
            }
            let count = 1;
            for (let end = month.length; end < month_grid_count; end++) {
                month.push(
                    <div key={end + "end"} className='day aspect-ratio disabled-day' style={{opacity: '75%', backgroundColor: 'lightgray'}}>
                        <div className='day-header'>{count}</div>
                    </div>
                );
                count += 1;
            }
        }
        
        return (
            <div className='grid-container'>
                {month}
            </div>
        );
    }
    return (
        // <div className='main'>
        //     <div className='test'>Total Days: {selectedDays.length}</div>
            // {renderSelectedDays()}
            // <button type="button" onClick={() => console.log("selecteddays: " + selectedDays)}>Check Sel Days</button>
            <div className='calendar-container disable-select'>
                <div className='calendar-header'>
                    <IconBxsLeftArrow onClick={handleMonthChangeDecrease} width='25px' height='50%' />
                    <span style={{ width: '100px' }}>{Object.entries(monthEnum)[selectedMonth][1].day}</span>
                    <IconBxsRightArrow onClick={handleMonthChangeIncrease} width='25px'height='50%' />
                </div>
                <div className='calendar-day-header-container'>
                    <div className='calendar-day-header'>Sunday</div>
                    <div className='calendar-day-header'>Monday</div>
                    <div className='calendar-day-header'>Tuesday</div>
                    <div className='calendar-day-header'>Wednesday</div>
                    <div className='calendar-day-header'>Thursday</div>
                    <div className='calendar-day-header'>Friday</div>
                    <div className='calendar-day-header'>Saturday</div>
                </div>
                {renderMonth(Object.entries(monthEnum)[selectedMonth][1].days)}
                
            </div>
        // </div>
    )
}

export default CalendarTest;