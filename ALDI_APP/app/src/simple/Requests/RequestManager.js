import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './requestmanager.css';
import axios from 'axios';
import CalendarTest from './CalendarTest';

const RequestManager = () => {
    const navigate = useNavigate();
    const [requestNote, setRequestNote] = useState("test");
    // const [availablePTO, setAvailablePTO] = useState({ vacation: 0, sick: 0, personal: 0 });
    const [availablePTO, setAvailablePTO] = useState({ vacation: 2, sick: 0, personal: 0 });
    const [errMsg, setErrMsg] = useState("");
    const [selectedType, setSelectedType] = useState(-1);
    const date = new Date();
    const errRef = useRef();
    const testRef = useRef();

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
    const handleDayClickParent = event => {
        console.log(selectedDays)
        if (!selectedDays.includes(event.target.id)) {
            console.log(event.target.parentElement);
            console.log("clicked");
            setSelectedDays(prev => [...prev, event.target.id]);
            event.target.parentElement.style.backgroundColor = "#f0fff0";
            
        } else {
            setSelectedDays(prev => prev.filter(e => e !== event.target.id));
            event.target.parentElement.style.backgroundColor = "transparent";
        }
        
    }

    const handleRequestNoteChange = event => {
        console.log("blur triggered");
        setRequestNote(event.target.value);
    }

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

    const dateDay = (type) => {
        let days = [];
        const thirty_one = [1, 3, 5, 7, 8, 10, 12];
        const thirty = [4, 6, 9, 11];
        const month = (type === "from") ? selectedDate.from.month : selectedDate.to.month;
        const year = (type === "from") ? selectedDate.from.year : selectedDate.to.year;
        for (let i = 1; i <= (thirty_one.includes(month) ? 31 : (thirty.includes(month) ? 30 : (year % 4 === 0) ? 29 : 28)); i++) {
            days.push(i);
        }

        return (
            <select disabled={errMsg !== ""} type="dropdown" id={ (type === "from") ? "date-from-day" : "date-to-day" } onChange={handleDayChange}>
                {days.map((day, key) => {
                    return (
                        <option key={key} value={day}>{day}</option>
                    )
                })}
            </select>
        )
    }
    const dateMonth = (type) => {
        return (
            <select disabled={errMsg !== ""} type="dropdown" id={ (type === "from") ? "date-from-month" : "date-to-month" } onChange={handleMonthChange}>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
        )
    }
    const dateYear = (type) => {
        let date = new Date();
        const current_year = date.getFullYear();

        return (
            <select disabled={errMsg !== ""} type="dropdown" id={ (type = "from") ? "date-from-year" : "date-to-year" } onChange={handleYearChange}>
                <option value={current_year}>{current_year}</option>
                <option value={current_year + 1}>{current_year + 1}</option>
                <option value={current_year + 2}>{current_year + 2}</option>
            </select>
        )
    }
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
    const requests = [
        { name: "Isabella Salerno", type: "Vacation", timeRemaining: "2 days"},
        { name: "Peanut Salerno", type: "Vacation", timeRemaining: "8 days"},
        { name: "Sophie Salerno", type: "Sick", timeRemaining: "14 days"},
        { name: "Francesca Salerno", type: "Personal", timeRemaining: "32 days"}
    ]
    const [openRequest, setOpenRequest] = useState(null);
    const handleOpenRequestClick = event => {
        console.log(event.target.id);
        console.log(event.currentTarget.id);
        setOpenRequest(event.currentTarget.id);
    }
    const handleOpenRequestClose = () => {
        setOpenRequest(null);
    }
    const GetTable = () => {
        let rows = [];
        requests.map(e => {
            rows.push(
                    <tr key={e.name} id={e.name} onClick={handleOpenRequestClick}>
                        <td value={e.name}>{e.name}</td>
                        <td>{e.type}</td>
                        <td>{e.timeRemaining}</td>
                    </tr>
            )
            if (openRequest === e.name) {
                console.log("open request is " + e.name);
                rows.push(
                    <tr key={openRequest + " open"}>
                        <OpenRequest/>
                    </tr>
                )
            }
        });
        console.log(rows);
        return (
            <table className='manager-request-table striped'>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Type</th>
                        <th>Time Remaining</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
    const OpenRequest = () => {
        return (
                <td align='center' colSpan='3'>
                    <div className='manager-table-open-request-container'>
                        <div className='manager-table-open-request-left'>
                            <button type="button">View Calendar</button>
                            <div className='manager-request-disputed-days'>
                                {renderSelectedDays()}
                                <textarea rows="2" cols="50" id="manager-request-note-input" placeholder="Add an optional note..." onBlur={handleRequestNoteChange} />
                            </div>
                            <div className='manager-request-response-type'>
                                <label htmlFor='manager-request-response-type-input'>Response Type:</label>
                                <select id='manager-request-response-type-input'
                                    style={{width: '80%', textAlign: 'center'}}>
                                    <option value='approve'>Approve</option>
                                    <option value='need more info'>Need More Information</option>
                                    <option value='deny'>Deny</option>
                                </select>
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
    const Test = () => {
        
    }
    const filterNavRef = useRef();
    
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
            <div>
                <div className='manager-pending-request-item'>
                    {/* <div style={{fontSize: "100px", fontWeight: "lighter", color: "blue", fontFamily: 'cursive'}}>izzy stinky</div> */}
                    <div className='manager-requests-body-container'>
                        
                        <div className='manager-request-body-header'>
                            <button type='button' id='manager-filter-button' onClick={filter}>Filter</button>
                            <div ref={filterNavRef} className='manager-request-filter-nav'>
                                <div>hsey</div>
                            </div>
                        </div>
                        
                            <GetTable />
                        {/* <table className='manager-request-table'>
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Type</th>
                                    <th>Time Remaining</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Isabella Salerno</td>
                                    <td>Vacation</td>
                                    <td>2 days</td>
                                </tr>
                                <tr>
                                    <td align='center' colSpan='3'>
                                        <div className='manager-table-open-request-container'>
                                            <div className='manager-table-open-request-left'>
                                                <button type="button">View Calendar</button>
                                                <div className='manager-request-disputed-days'>
                                                    {renderSelectedDays()}
                                                    <textarea rows="2" cols="50" id="manager-request-note-input" placeholder="Add an optional note..." onBlur={handleRequestNoteChange} />
                                                </div>
                                                <div className='manager-request-response-type'>
                                                    <label htmlFor='manager-request-response-type-input'>Response Type:</label>
                                                    <select id='manager-request-response-type-input'
                                                        style={{width: '80%', textAlign: 'center'}}>
                                                        <option value='approve'>Approve</option>
                                                        <option value='need more info'>Need More Information</option>
                                                        <option value='deny'>Deny</option>
                                                    </select>
                                                </div>
                                                <button type='button' className='manager-request-submit-response-button'>Submit Response</button>
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
                                </tr>
                            </tbody>
                        </table> */}
                    </div>
                    
                </div>
            </div>
        )
    }



    return (
        <div className='manager-request-main'>
            <div className='manager-request-container'>
                <div id='pending-button' className='pending-button-non-current' onClick={() => navigate('/request/pending')}>Pending</div>
                <div id='complete-button' className='pending-button-non-current' onClick={() => navigate('/request/complete')}>Complete</div>
                <div id='create-new-button' className='pending-button-current'>Create New</div>
                
                <div className='manager-request-body'>          
                    
                    <GetForm />
                </div>
            </div>   
        </div>
    )
}

export default RequestManager;