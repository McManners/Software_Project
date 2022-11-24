import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './requestmanager.css';
import axios from 'axios';
import CalendarTest from './CalendarTest';
import useAuth from '../useAuth';

const RequestManager = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [requestNote, setRequestNote] = useState("test");
    // const [availablePTO, setAvailablePTO] = useState({ vacation: 0, sick: 0, personal: 0 });
    const [availablePTO, setAvailablePTO] = useState({ vacation: 2, sick: 0, personal: 0 });
    const [errMsg, setErrMsg] = useState("");
    const [selectedType, setSelectedType] = useState(-1);
    const date = new Date();
    const errRef = useRef();
    const [tickets, setTickets] = useState([]);
    const [responseType, setResponseType] = useState(null);

    useEffect(() => {
        setErrMsg("");
    }, [selectedType]);

    // useEffect(() => {
    //     axios({
    //         method: 'GET',
    //         url: 'http://localhost:3001/pto',
    //         withCredentials: true,
    //     })
    //     .then(res => {
    //         setAvailablePTO({
    //             vacation: res.data.foundPTO.vacation_available,
    //             sick: res.data.foundPTO.sick_available,
    //             personal: res.data.foundPTO.personal_available
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }, []);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth() - 1);
    const [selectedYear, setSelectedYear] = useState(date.getFullYear());

    const handleRequestNoteChange = event => {
        console.log("blur triggered");
        setRequestNote(event.target.value);
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:3001/ticket/get/leader',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${auth.access_token}`
            },
            data: {
                access_token: auth.access_token
            }
        })
        .then(function(res) {
            console.log(res.data.tickets);
            setTickets(res.data.tickets);
            setRequestsState(res.data.tickets);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const createTicket = async event => {
        event.preventDefault();
        
        console.log("clicked");
        axios({
        method: 'POST',
        url: 'http://localhost:3001/ticket/create',
        withCredentials: true,
        data: {
            date_from: selectedDate.from.year.toString() + "-" +
                        ((selectedDate.from.month < 10) ? 
                            ("0" + selectedDate.from.month.toString()) : 
                            (selectedDate.from.month.toString())) + "-" +
                            ((selectedDate.from.day < 10) ? 
                            ("0" + selectedDate.from.day.toString()) : 
                            (selectedDate.from.day.toString())),
            date_to: selectedDate.to.year.toString() + "-" +
                        ((selectedDate.to.month < 10) ? 
                            ("0" + selectedDate.to.month.toString()) : 
                            (selectedDate.to.month.toString())) + "-" +
                            ((selectedDate.to.day < 10) ? 
                            ("0" + selectedDate.to.day.toString()) : 
                            (selectedDate.to.day.toString())),
            request_note: requestNote
        }
        })
        /*
            https://stackoverflow.com/questions/62964902/axios-post-extracting-data-from-response
        */
        .then(function(res) {
            console.log(res);
            // navigate("/dashboard/requests", { replace: true });
        })
        .catch(err => {
            console.log(err);
        });
    };

    const [requestTypes, setRequestTypes] = useState([
            { "pto_type_id": 0, "pto_type": "Vacation" },
            { "pto_type_id": 1, "pto_type": "Personal" },
            { "pto_type_id": 2, "pto_type": "Sick" }
        ]);

    const handlePTOTypeSelect = event => {
        event.preventDefault();
        console.log(Object.values(availablePTO)[event.target.value]);
        if (Object.values(availablePTO)[event.target.value] === 0) {
            console.log("no");
            setErrMsg("No available PTO for type " + requestTypes[event.target.value].pto_type)
            errRef.current.focus();
        } else {
            setErrMsg(""); // TODO: I added this late...
            setSelectedType(event.target.value);
        }
    }
    const handleDayChange = event => {
        event.preventDefault();

        if (event.target.id === "date-from-day") {
            var a = Object.assign({}, selectedDate.from);
            a.month = event.target.value;
            setSelectedDate(prev => ({ ...prev, from: a })) // cool code
        } else if (event.target.id === "date-to-day") {
            var a = Object.assign({}, selectedDate.to);
            a.month = event.target.value;
            setSelectedDate(prev => ({ ...prev, to: a }))
        }
    }
    const handleMonthChange = event => {
        event.preventDefault();

        if (event.target.id === "date-from-month") {
            var a = Object.assign({}, selectedDate.from);
            a.month = event.target.value;
            setSelectedDate(prev => ({ ...prev, from: a })) // cool code
        } else if (event.target.id === "date-to-month") {
            var a = Object.assign({}, selectedDate.to);
            a.month = event.target.value;
            setSelectedDate(prev => ({ ...prev, to: a }))
        }
    }
    // useEffect(() => {
    //     axios({
    //         method: "GET",
    //         url: "http://localhost:3001/api/ptotype",
    //         withCredentials: true
    //     })
    //     .then(res => {
    //         setRequestTypes(res.data);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }, []);

    // TODO: Verify date day exists...

    const handleYearChange = event => {
        event.preventDefault();

        if (event.target.id === "date-from-year") {
            var a = Object.assign({}, selectedDate.from);
            a.year = event.target.value;
            setSelectedDate(prev => ({ ...prev, from: a })) // cool code
        } else if (event.target.id === "date-to-year") {
            var a = Object.assign({}, selectedDate.to);
            a.year = event.target.value;
            setSelectedDate(prev => ({ ...prev, to: a }))
        }
    }
    const [selectedDate, setSelectedDate] = useState({ 
            from: { month: 1, day: 1, year: date.getFullYear()},
            to: { month: 1, day: 1, year: date.getFullYear() }
        });

    const renderSelectedDays = () => {
        let days = "";
        selectedDays.forEach(e => {
            days += (`${e}, `);
        })
        return (
            <div>
                Select conflicting days: <div style={{color: 'red', fontWeight: 'bold'}}>{days}</div>
            </div>
        )
    }

    const [requestsState, setRequestsState] = useState(tickets);
    const [openRequestID, setOpenRequestID] = useState(null);
    const handleOpenRequestClick = event => {
        console.log(event.target.id);
        console.log(event.currentTarget.id);
        if (openRequestID === event.currentTarget.id)
            setOpenRequestID(null)
        else
        setOpenRequestID(event.currentTarget.id);
    }
    const handleOpenRequestClose = () => {
        setOpenRequestID(null);
    }
    console.log(auth);
    const getTimeRemaining = (d) => {
        const date = new Date();
        const dateCreated = new Date(d.split(".",1)[0]);
        const time_difference = date.getTime() - dateCreated.getTime();
        const result = time_difference / (1000 * 60 * 60 * 24);
        return result;
    }
    const handleResponseTypeClick = event => {
        event.preventDefault();

        setResponseType(event.target.value);
    }

    const GetTable = () => {
        console.log("<GetTable />");
        let rows = [];
        requestsState.map(e => {
            console.log('requestid: ' + e.requestID);
            console.log(e.createdAt);
            const t = getTimeRemaining(e.createdAt);
            rows.push(
                    <tr key={e.ticket_id} id={parseInt(e.ticket_id)} onClick={handleOpenRequestClick} className='manager-request-table-row'>
                        <td>{e.ticket_id}</td>
                        <td>{e.eid}</td>
                        <td>{`${e.employeeData.first_name} ${e.employeeData.last_name}`}</td>
                        <td>{e.pto_type_id}</td>
                        <td>{e.createdAt.split("T",1)[0]}</td>
                        <td>{!(t > 7) ? 
                                (`${t} days`) : 
                                    ((t % 7) === 0) ? 
                                        ((t / 7) > 1) ? 
                                            (`${t / 7} weeks`) : 
                                                (`${t / 7} week`) :
                                        (`${(t / 7).toFixed(0)} ${((t / 7).toFixed(0) > 1) ? 'weeks,' : 'week,'} ${((t % 7) > 1) ? `${(t % 7).toFixed(0)} days` : `${(t % 7).toFixed(0)} day`}`)}
                        </td>
                    </tr>
            )
            if (Number(openRequestID) === e.ticket_id) {
                console.log("open request is " + e.ticket_id);
                rows.push(
                    <tr key={openRequestID + 'requestID'} className='manager-request-open-request-row'>
                        <OpenRequestID />
                    </tr>
                )
            }
        });
        return (
                <table className='manager-request-table'>
                    <thead>
                        <tr>
                            <th>
                                Ticket ID
                            </th>
                            <th>
                                Employee ID
                            </th>
                            <th>
                                Employee Name
                            </th>
                            <th>
                                PTO Type
                            </th>
                            <th>
                                Submit Date {filterDropdown('submitDate')}
                            </th>
                            <th>
                                Time Remaining {filterDropdown('timeRemaining')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
        )
    }
    const OpenRequestID = () => {
        return (
                <td align='center' colSpan='6'>
                    <div className='manager-table-open-request-container'>
                        <div className='manager-table-open-request-left'>
                            <div className='manager-request-disputed-days'>
                                {renderSelectedDays()}
                                <textarea rows="2" className="manager-request-note-input" placeholder="Add an optional note..." onBlur={handleRequestNoteChange} />
                            </div>
                            <div className='manager-request-response-type'>
                                <button 
                                    type='button' 
                                    value='approve'
                                    style={{backgroundColor: '#76ff7a', padding: responseType === 'approve' ? '10px' : '3px 5px'}} 
                                    onClick={handleResponseTypeClick}
                                    className='manager-request-response-type-button-selected'
                                >Approve</button>
                                <button 
                                    type='button' 
                                    value='more'
                                    style={{backgroundColor: '#fff700', padding: responseType === 'more' ? '10px' : '5px'}} 
                                    onClick={handleResponseTypeClick}
                                    className='manager-request-response-type-button-selected'
                                >Request More Information</button>
                                <button 
                                    type='button' 
                                    value='deny'
                                    style={{backgroundColor: '#ff4040', padding: responseType === 'deny' ? '10px' : '5px'}}
                                    onClick={handleResponseTypeClick}
                                    className='manager-request-response-type-button-selected'
                                >Deny</button>
                            </div>
                            <button type='button' className='manager-request-submit-response-button'>Submit Response</button>
                            <button type="button" className="open-request-close-button" onClick={handleOpenRequestClose}>Close</button>
                        </div>
                        <div className='cal-container'>
                            <CalendarTest 
                                setSelectedDays={setSelectedDays} 
                                selectedDays={selectedDays} 
                                setSelectedMonth={setSelectedMonth}
                                selectedMonth={selectedMonth}
                                setSelectedYear={setSelectedYear}
                                selectedYear={selectedYear}
                                calendarType="Manager"
                            />
                        </div>
                    </div>
                </td>
        )
    }
    const filterNavRef = useRef();
    const filterDropdown = (type) => {
        
        return (
            <div className='manager-filter-dropdown'>
                <button type='button' id={`manager-filter-${type}`} className='manager-filter-button'>Filter</button>
                <div className='manager-filter-dropdown-content' id={`manager-filter-${type}`}>
                    {requestsState.map((e, index) => {
                        return (
                            <div key={index} 
                                id={type === 'name' ? e.name : type === 'type' ? e.type : type === 'submitDate' ? e.submitDate : e.timeRemaining} 
                                onClick={filterRequests}
                            >
                                {type == 'name' ? e.name : type == 'type' ? e.type : type === 'submitDate' ? e.submitDate : e.timeRemaining}
                            </div>
                        )
                        })}
                </div>
            </div>
        )
    }
    const resetRequestTable = event => {
        event.preventDefault();
        setRequestsState(tickets);
    }
    const filterRequests = event => {
        setRequestsState(tickets);
        console.log(event.target.parentElement);
        console.log(event.target.parentElement.id);
        console.log(event.target.id);
        if (event.target.parentElement.id == 'manager-filter-name') {
            setRequestsState(prev => prev.filter(e => e.name === event.target.id))
        } else if (event.target.parentElement.id == 'manager-filter-type') {
            setRequestsState(prev => prev.filter(e => e.type === event.target.id))
        } else if (event.target.parentElement.id == 'manager-filter-timeRemaining') {
            setRequestsState(prev => prev.filter(e => e.timeRemaining === event.target.id))
        } else if (event.target.parentElement.id == 'manager-filter-submitDate') {
            setRequestsState(prev => prev.filter(e => e.submitDate === event.target.id))
        }
    }
    const [filterNamePlaceholder, setFilterNamePlaceholder] = useState('Filter by name...');
    const [filterTypePlaceholder, setFilterTypePlaceholder] = useState('Filter by name...');
    const [filterTimeRemainingPlaceholder, setFilterTimeRemainingPlaceholder] = useState('Filter by name...');

    const filter = () => {
        console.log(filterNavRef.current.style.width);
        if (filterNavRef.current.style.width === "0px") {
            filterNavRef.current.style.width = "10%";
        } else {
            filterNavRef.current.style.width = "0px";
        }
    }
    const GetForm = () => {
        return (
            <div className='manager-pending-request-item'>
                <div className='manager-requests-body-container'>
                    <div className='manager-request-body-header'>
                        <button type='button' id='manager-reset-table-button' onClick={resetRequestTable}>Reset Table</button>
                    </div>
                    
                    <GetTable />
                </div>
                
            </div>
        )
    }



    return (
        <div className='manager-request-main'>
            <div className='manager-request-container'>
                <div id='pending-button' className='pending-button-non-current' onClick={() => navigate('/dashboard/pending')}>Pending</div>
                <div id='complete-button' className='pending-button-non-current' onClick={() => navigate('/dashboard/complete')}>Complete</div>
                <div id='create-new-button' className='pending-button-current'>Create New</div>
                
                <div className='manager-request-body'>          
                    <div className='manager-scroll-container' key={'hey'}>
                        <GetForm key={'render-test'}/>
                    </div>
                </div>
            </div>   
        </div>
    )
}

export default RequestManager;