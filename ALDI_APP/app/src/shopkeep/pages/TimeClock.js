import React, { useState, useEffect, useRef } from 'react';
import './timeclock.css';
import { TbPrinter } from 'react-icons/tb';
import { IconContext } from 'react-icons/lib';
import { BsCalendarWeek, BsChevronDown } from 'react-icons/bs';
import { HiFilter } from 'react-icons/hi';
import { SlPencil } from 'react-icons/sl';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import MiniCalendar from '../../simple/Requests/MiniCalendar';
import { formatTime } from '../../simple/Requests/Functions/DateInfo';
import DeleteStaffTimeClockModal from '../components/DeleteStaffTimeClockModal.js';
import EditTimeClock from '../components/EditTimeClock';

const TimeClock = () => {
    const [tickets, setTickets] = useState(null);
    const [hoverRow, setHoverRow] = useState(1);
    const [rowCount, setRowCount] = useState(0);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [staffToDelete, setStaffToDelete] = useState(null);
    const [timeClockToEdit, setTimeClockToEdit] = useState(null);
    const timeClock = require('../data/timeclock.json');
    
    const [emp, setEmp] = useState(null);
    

    useEffect(() => {
        let employees = [];

        timeClock.forEach(timeclock => {
            if (employees.find(e => e['Employee Name'] === timeclock['Employee Name'])) {
                if (employees.find(e => e['Employee Name'] === timeclock['Employee Name'])['Dates'].find(date => date['Date'].split(" ")[0] === timeclock['Time In'].split(" ")[0])) {
                    if (!employees.find(e => e['Employee Name'] === timeclock['Employee Name'])['Dates'].find(date => date['Date'].split(" ")[0] === timeclock['Time In'].split(" ")[0])['Time'].find(time => time['In'] === timeclock['Time In'])) {
                        employees.find(e => e['Employee Name'] === timeclock['Employee Name'])['Dates'].find(date => date['Date'].split(" ")[0] === timeclock['Time In'].split(" ")[0])['Time'].push({ "Day": timeclock['Day'], "In": timeclock['Time In'], "Out": timeclock['Time Out'], "Hours": timeclock['Hours']});
                    }
                } else {
                    employees.find(e => e['Employee Name'] === timeclock['Employee Name'])['Dates'].push({ "Date": timeclock["Time In"].split(" ")[0], "Time": [ { "Day": timeclock['Day'], "In": timeclock['Time In'], "Out": timeclock['Time Out'], "Hours": timeclock['Hours'] } ]});
                }
            } else {
                employees.push( { "Employee Name": timeclock['Employee Name'], "Dates": [ { "Date": timeclock["Time In"].split(" ")[0], "Time": [ { "Day": timeclock['Day'], "In": timeclock['Time In'], "Out": timeclock['Time Out'], "Hours": timeclock['Hours'] } ] } ] });
            }    
        });

        console.log(employees);
        setEmp(employees);
    }, []);


    const PrinterButton = () => {
        return (
            <button className='print-btn'>
                <IconContext.Provider value={{ style: { verticalAlign: 'middle' }, size: '1.2em' }}>
                    <TbPrinter className='print-icon' />
                </IconContext.Provider>
                <div>Print</div>
            </button>
        )
    }
    const [daySelected, setDaySelected] = useState([]);
    const [miniCalendarOpen, setMiniCalendarOpen] = useState(false);
    
    const handleFilterDate = (dateArr) => {
        console.log(dateArr);
    }
    const monthStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [filterDate, setFilterDate] = useState([{ Day: 1, Month: 1, Year: 2023 }, { Day: 1, Month: 1, Year: 2023 }]);
    const CalendarButton = () => {
        return (
            <div>
                <button className='calendar-btn' onClick={() => setMiniCalendarOpen(prev => !prev)}>
                    <IconContext.Provider value={{ style: { verticalAlign: 'middle'}, size: '1em' }}>
                        <BsCalendarWeek className='calendar-icon' />
                    </IconContext.Provider>
                    <div>{`${monthStrings[filterDate[0].Month - 1]} ${filterDate[0].Day}, ${filterDate[0].Year} - ${monthStrings[filterDate[1].Month - 1]} ${filterDate[1].Day}, ${filterDate[1].Year}`}</div>
                </button>
                <MiniCalendar handleFilterDate={handleFilterDate} miniCalendarOpen={miniCalendarOpen} setMiniCalendarOpen={setMiniCalendarOpen} daySelected={daySelected} setDaySelected={setDaySelected} setFilterDate={setFilterDate} />
            </div>
        )
    }
    const FilterButton = () => {
        return (
            <button className='filter-btn'>
                <IconContext.Provider value={{ style: { verticalAlign: 'middle'}, size: '1.2em' }}>
                    <HiFilter className='filter-icon' />
                </IconContext.Provider>
                <div>Filter</div>
            </button>
        )
    }
    const ExportButton = () => {
        return (
            <button className='export-btn'>
                <span>Export</span>
                <IconContext.Provider value={{ style: { verticalAlign: 'middle', position: 'relative', top: '1px', left: '1px'}, size: '1em' }}>
                    <BsChevronDown className='export-icon' />
                </IconContext.Provider>
            </button>
        )
    }
    const test = (rowID) => {
        console.log('setting hover row to rodID: ' + rowID);
        setHoverRow(rowID);
    }
    const handleDeleteTimeClockRow = (time) => {
        console.log('Deleting row...');
        console.log(time['In']  )
        setStaffToDelete({ 'From': time['In'], 'To': time['Out'], 'Hours': time['Hours'] });
    }
    console.log('hey')
    const outputTickets = () => {
        return emp.map((employee, index) => {
            return (
                <tr key={'employee ' + employee['Employee Name']}>
                    <td>
                        <table className='ContentTable' style={{borderLeft: (index % 2 === 0) ? '5px solid rgb(7, 67, 105)' : '5px solid rgb(55, 130, 131)' }}>
                            <tbody>
                                <tr className='ContentHead' onMouseOver={() => setHoverRow((index * 2) + 1)}>
                                    <td className='BorderImage'>
                                        <span className={index % 2 === 0 ? 'Name Dark' : 'Name Light' }>{employee['Employee Name']}</span>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td><span className='TimeClock_AddWorkShift_Button'>Add Work Shift</span></td>
                                </tr>
                                {
                                    employee['Dates'].map(date => {
                                        return (
                                            date['Time'].map((time, index) => {
                                                // onMouseOver={() => setHoverRow((index * 2) + 2)}
                                                return (
                                                    <tr className='ContentBody' key={employee['Employee Name'] + ' time ' + index}>
                                                        <td style={{fontSize: '14px', fontWeight: '300'}} className='BorderImage TimeClock_NameDateColumnData'>{time['Day']}</td>
                                                        <td style={{fontSize: '14px', fontWeight: '300'}}>{time['In']}</td>
                                                        <td style={{fontSize: '14px', fontWeight: '300'}}>{time['Out']}</td>
                                                        <td style={{fontSize: '14px', fontWeight: '300'}}>
                                                            {time['Hours']}
                                                            <button className='TimeClock_Delete_Button' onClick={() => handleDeleteTimeClockRow(time)}>
                                                                <RiDeleteBin6Line size='1.5em' />
                                                            </button>
                                                            <button className='TimeClock_Edit_Button' onClick={() => setTimeClockToEdit(time)}>
                                                                <SlPencil size='1.2em' />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    )
                                                })
                                            )
                                        }
                                    )
                                }
                            </tbody>
                        </table>
                    </td>
                </tr>
            )
        });
    }

    const filterTickets = () => {
        setRowCount(filteredTickets.length);
    }
    return (
        <div className='TimeClock'>
            <div className='new-manager-header'>
                <div>Time Clock</div>
                <div style={{flexGrow: '1'}}></div>
                <CalendarButton />
                <PrinterButton />
                <FilterButton />
            </div>
            {
                (staffToDelete !== null) ? 
                    <DeleteStaffTimeClockModal staffToDelete={staffToDelete} setStaffToDelete={setStaffToDelete} /> : 
                        (timeClockToEdit !== null) ?
                            <EditTimeClock timeClockToEdit={timeClockToEdit} setTimeClockToEdit={setTimeClockToEdit} /> : ''
            }
            <div className='content'>
                <div className='TimeClock_Content_Table_Header_Wrapper'>
                    <div className='TimeClock_Content_Table_Header_First'>
                        <span className='RowCount'>Row 1 / 95</span>
                    </div>
                    
                    <div className='TimeClock_Content_Table_Header_Titles'>
                        <div className='BorderImage TimeClock_Content_Table_Header_Item'>
                            <span className='TimeClock_Content_Table_Header_Item_Text'>
                                Employee Name & Day
                            </span>        
                        </div>
                        <div className='TimeClock_Content_Table_Header_Item'>
                            <span className='TimeClock_Content_Table_Header_Item_Text'>
                                Time In
                            </span>
                        </div>
                        <div className='TimeClock_Content_Table_Header_Item'>
                            <span className='TimeClock_Content_Table_Header_Item_Text'>
                                Time Out
                            </span>
                        </div>
                        <div className='TimeClock_Content_Table_Header_Item'>
                            <span className='TimeClock_Content_Table_Header_Item_Text'>
                                Hours
                            </span>
                        </div>
                    </div>
                </div>
                <table>
                    <tbody>
                        {emp !== null ? outputTickets() : <></>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TimeClock;