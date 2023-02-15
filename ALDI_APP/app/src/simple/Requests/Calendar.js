import React, { useEffect, useRef, useState } from 'react';
import './calendar.css';
import IconBxsLeftArrow from './Icons/IconBxsLeftArrow.tsx';
import IconBxsRightArrow from './Icons/IconBxsRightArrow.tsx';
import IconHalloween from './Icons/IconHalloween.tsx';
import { HiOutlineDotsVertical } from 'react-icons/hi';

const Calendar = ({setSelectedDays, selectedDays, setSelectedMonth, selectedMonth, setSelectedYear, selectedYear, calendarType, employeeDaysTest, dayRef, pto }) => {
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
    const [openDay, setOpenDay] = useState(null);
    
    const handleDayRefOpen = event => {
        event.preventDefault();
        console.log("opened");
        setOpenDay(event.target.id);
        dayRef.current.style.width = '75%';
    }
    const handleDayRefClose = event => {
        event.preventDefault();
        setOpenDay(null)
        dayRef.current.style.width = '0';
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
    const handleDayClick = event => {
        if (!selectedDays.includes(event.target.id)) {
            setSelectedDays(prev => [...prev, event.target.id]);
        } else {
            setSelectedDays(prev => prev.filter(e => e !== event.target.id));
        }
    }
    
    let allMonths = [];
    if (calendarType === "Manager") {
        employeeDaysTest.forEach(date => {
            const d = new Date(date);
            if (!allMonths.includes(d.getMonth())) {
                allMonths.push(d.getMonth());
            }
        })
    };
    const renderMonth = (currMonth) => {
        console.log(employeeDaysTest);
        setStartOfMonth();
        const first_day = Object.entries(monthEnum)[selectedMonth][1].firstDayOfMonth;
        const prev_month_days = Object.entries(monthEnum)[selectedMonth === 0 ? 11 : selectedMonth - 1][1].days;
        const total_days_in_month = Object.entries(monthEnum)[selectedMonth][1].days;
        let month = [];
        if (calendarType === "Manager") {
            for (let i = 1; i < currMonth + 1; i++) {
                employeeDaysTest.includes((`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}T00:00:00.000Z`))
                month.push(
                    <div className={
                        selectedDays.includes((`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}T00:00:00.000Z`)) ?
                            'day valid-day denied-day' :
                                employeeDaysTest.includes((`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}T00:00:00.000Z`)) ? 
                                    'day valid-day aspect-ratio selected-day' : 'day disabled-day aspect-ratio'
                    } key={`${selectedMonth + 1}${(i < 10 ? `0${i}` : i)}${selectedYear}T00:00:00.000Z`}>
                            <div>
                                <div className='day-header'>{i}</div>
                            </div>
                        {
                            employeeDaysTest.includes((`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}T00:00:00.000Z`)) ? 
                            <div className='spread' id={`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}T00:00:00.000Z`} onClick={handleDayClick}></div> :
                            <div className='spread' id={`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}T00:00:00.000Z`}></div>
                        }
                        {calendarType === "Manager" ? <HiOutlineDotsVertical className='calendar-open-day' id={`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}T00:00:00.000Z`} onClick={handleDayRefOpen} /> : ''}
                    </div>
                )
            }
        } else {
            for (let i = 1; i < currMonth + 1; i++) {
                month.push(
                    <div className={selectedDays.includes((`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}`)) ? 
                            'day aspect-ratio selected-day' : 'day aspect-ratio'}
                        key={`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}`}>
                        <div>
                            <div className='day-header'>{i}</div>
                        </div>
                        <div className='spread' id={`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}`} onClick={handleDayClick}></div>
                        
                        {calendarType === "Manager" ? <HiOutlineDotsVertical className='calendar-open-day' id={`${selectedYear}-${selectedMonth + 1}-${(i < 10 ? `0${i}` : i)}T00:00:00.000Z`} onClick={handleDayRefOpen} /> : ''}

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
                    {calendarType === "Manager" ? <HiOutlineDotsVertical className='calendar-open-day' id={`${selectedYear}-10-31T00:00:00.000Z`} onClick={handleDayRefOpen} /> : ''}

                </div> 
            )
        }
        let month_grid_count = 42;
        if (month.length < month_grid_count) {
            for (let beg = 0; beg < first_day; beg++) {
                month.unshift(
                        <div key={beg + "beg"} className='day aspect-ratio disabled-day'>
                            <div className='day-header'>{prev_month_days - beg}</div>
                        </div>
                );
            }
            let count = 1;
            for (let end = month.length; end < month_grid_count; end++) {
                month.push(
                    <div key={end + "end"} className='day aspect-ratio disabled-day'>
                        <div className='day-header'>{count}</div>
                    </div>
                );
                count += 1;
            }
        }
        
        return (
            <div className='calendar-grid-container'>
                {month}
            </div>
        );
    }
    const getEmployeeDays = () => {
        // if (pto.length === 0) return;
        console.log(pto);
        console.log(openDay);
        let employee_id_array = [];
        return (
            pto.map((e, index) => {
                for (let i = 0; i < e.Ticket_History.Ticket_Date_Ranges.length; i++) {
                    if (e.Ticket_History.Ticket_Date_Ranges[i].requested_date === openDay && !employee_id_array.includes(e.Ticket_History.employee_id)) {
                        employee_id_array.push(e.Ticket_History.employee_id);
                        return (
                            <tr key={index + "pto_table"}>
                                <td>{e.Ticket_History.Employee.employee_id}</td>
                                <td>{`${e.Ticket_History.Employee.first_name} ${e.Ticket_History.Employee.last_name}`}</td>
                            </tr>
                        );
                    }
                }
            })
        );
    }
    const GetOpenDay = () => {
        if (calendarType === "Manager") {
            if (openDay !== null) {
                return (
                    <div>
                        <button type='button' onClick={handleDayRefClose}>Close</button>
                        <div className='calendar-open-day-content'>
                            Employees Granted PTO for <u>{new Date(openDay).toDateString()}</u>:
                            <table>
                                <thead>
                                    <tr>
                                        <th>Employee ID</th>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {getEmployeeDays()} */}
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                )
            }
        } else {
            return (
                <div>
                    <button type='button' onClick={handleDayRefClose}>Close</button>
                    
                </div>
            )
        }
    }
    console.log(selectedMonth)
    return (
            <div className='calendar-container disable-select'>
                <div className='calendar-header'>
                    <IconBxsLeftArrow onClick={handleMonthChangeDecrease} style={{color: (allMonths.includes((selectedMonth > 0) ? selectedMonth : 11)) ? "red" : "black"}} width='25px' height='50%' />
                    <span style={{ width: '100px' }}>{Object.entries(monthEnum)[selectedMonth][1].day}</span>
                    <IconBxsRightArrow onClick={handleMonthChangeIncrease} style={{color: (allMonths.includes((selectedMonth < 11) ? selectedMonth : 0)) ? "red" : "black"}} width='25px'height='50%' />
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
                
                <div className='calendar-open-day-container' ref={dayRef}>
                    {calendarType === "Manager" ? <GetOpenDay /> : ''}
                </div>
            </div>
    )
}

export default Calendar;