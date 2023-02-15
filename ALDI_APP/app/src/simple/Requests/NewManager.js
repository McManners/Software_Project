import React, { useState, useEffect, useRef } from 'react';
import './newmanager.css';
import { TbPrinter } from 'react-icons/tb';
import { IconContext } from 'react-icons/lib';
import { BsCalendarWeek, BsChevronDown } from 'react-icons/bs';
import { HiFilter } from 'react-icons/hi';
import useAxiosPrivate from '../useAxiosPrivate';
import useAuth from '../useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import MiniCalendar from './MiniCalendar';
import { formatTime } from './Functions/DateInfo';

const NewManager = () => {
    const [tickets, setTickets] = useState(null);
    const { auth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [hoverRow, setHoverRow] = useState(1);
    const [rowCount, setRowCount] = useState(0);
    const [filteredTickets, setFilteredTickets] = useState([]);

    useEffect(() => {
        console.log(auth)
        // https://github.com/gitdagray/react_persist_login/blob/main/src/components/Users.js
        let isMounted = true;
        const controller = new AbortController();

        const getTickets = async () => {
            // https://flaviocopes.com/axios-send-authorization-header
            try {
                const response = await axiosPrivate.get('/ticket/get/leader/closed', {
                    access_token: auth.access_token
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth.access_token}`
                    }
                });
                isMounted = true;
                console.log(response.data);
                setTickets(response.data);
                setFilteredTickets(response.data);
                setRowCount(response.data.length * 2)
            } catch (err) {
                console.log(err);
                // logout();
                // navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getTickets();
        
        return () => {
            isMounted = false;
            controller.abort();
        }
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
    const outputTickets = () => {
        return tickets.map((ticket, index) => {
            return(
                <tr key={ticket.ticket_closed_id}>
                    <td>
                        <table className='ContentTable' style={{borderLeft: (index % 2 === 0) ? '5px solid rgb(7, 67, 105)' : '5px solid rgb(55, 130, 131)'}}>
                            <tbody>
                                <tr className='ContentHead' onMouseOver={() => setHoverRow((index * 2) + 1)}>
                                    <td className='BorderImage'>
                                        <span className={index % 2 === 0 ? 'Name Dark' : 'Name Light' }>{`${ticket.Employee.first_name} ${ticket.Employee.last_name}`}</span>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td><span className='Details'>Details</span></td>
                                </tr>
                                <tr className='ContentBody' onMouseOver={() => setHoverRow((index * 2) + 2)}>
                                    <td style={{fontSize: '14px', fontWeight: '300'}} className='BorderImage'>{ticket.Employee.employee_id}</td>
                                    <td style={{fontSize: '14px', fontWeight: '300'}}>{ticket.ticket_id}</td>
                                    <td style={{fontSize: '14px', fontWeight: '300'}}>{`${new Date(ticket.submit_date).toISOString().split('T')[0].replace(/-/g, '/')} ${formatTime(new Date(ticket.submit_date).toISOString().split('T')[1])}`}</td>
                                    <td style={{fontSize: '14px', fontWeight: '300'}}>{`${auth.first_name} ${auth.last_name}`}</td>
                                </tr>
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
        <div className='new-manager'>
            <div className='new-manager-header'>
                <div>Employee Tracker</div>
                <div style={{flexGrow: '1'}}></div>
                <CalendarButton />
                <PrinterButton />
                <FilterButton />
            </div>
            <div className='content'>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <table className='HeadTable'>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span className='RowCount'>{rowCount === 0 ? '' : `Row ${hoverRow} / ${rowCount}`}</span>
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <ExportButton />
                                            </td>
                                        </tr>
                                        <tr className='Header'>
                                            <td className='BorderImage'>Employee Name & ID</td>
                                            <td>Ticket ID</td>
                                            <td>Approved On</td>
                                            <td>Approved By</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        {tickets !== null ? outputTickets() : <></>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default NewManager;