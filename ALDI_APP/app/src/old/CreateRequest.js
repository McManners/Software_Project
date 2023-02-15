import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './createrequest.css';
import axios from 'axios';
import Calendar from './Calendar';

const CreateRequest = () => {
    const navigate = useNavigate();
    const [requestNote, setRequestNote] = useState("test");
    // const [availablePTO, setAvailablePTO] = useState({ vacation: 0, sick: 0, personal: 0 });
    const [availablePTO, setAvailablePTO] = useState({ vacation: 2, sick: 0, personal: 0 });
    const [errMsg, setErrMsg] = useState("");
    const [selectedType, setSelectedType] = useState(-1);

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

    const handleRequestNoteChange = event => {
        event.preventDefault();
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

    const date = new Date();
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

    const GetForm = () => {
        return (
            <div>
                <div className='pending-request-item'>
                    <div style={{ borderBottom: "2px solid blue", fontSize: "1.5rem", fontWeight: "bold" }}>From:</div>
                    <div>
                        <label disabled={errMsg !== ""} htmlFor="date-from-month">Month:</label>
                        {dateMonth("from")}
                        <label disabled={errMsg !== ""} htmlFor="date-from-day">Day:</label>
                        {dateDay("from")}
                        <label disabled={errMsg !== ""} htmlFor="date-from-year">Year: </label>
                        {dateYear("from")}
                    </div>
                </div>
                
                <div className='pending-request-item'>
                    <div style={{ borderBottom: "2px solid blue", fontSize: "1.5rem", fontWeight: "bold" }}>To:</div>
                    
                    <div ref={testRef}>
                        <label disabled={errMsg !== ""} htmlFor="date-to-month">Month:</label>
                        {dateMonth("to")}
                        <label disabled={errMsg !== ""} htmlFor="date-to-day">Day:</label>
                        {dateDay("to")}
                        <label disabled={errMsg !== ""} htmlFor="date-to-year">Year: </label>
                        {dateYear("to")}
                    </div>
                </div>
                <div className='pending-request-item'>
                    <div style={{ borderBottom: "2px solid blue", fontSize: "1.5rem", fontWeight: "bold" }}>
                        <label htmlFor="request-note-input">Request Note: </label>
                    </div>
                    <textarea rows="2" cols="50" id="request-note-input" placeholder="Add an optional note..." onBlur={handleRequestNoteChange} />
                </div>
                <button type="button" onClick={createTicket} id='create-ticket-button'>Create Ticket</button>
                {/* <button type="button" onClick={() => {
                    let x = selectedDate.from.year.toString() + 
                    ((selectedDate.from.month < 10) ? 
                    ("0" + selectedDate.from.month.toString()) : 
                    (selectedDate.from.month.toString())) +
                    ((selectedDate.from.day < 10) ? 
                    ("0" + selectedDate.from.day.toString()) : 
                    (selectedDate.from.day.toString()));
                    console.log(x);
                    console.log(selectedDate.from.year.toString() + "0");
                }}>Check Date</button> */}
            </div>
        )
    }

    return (
        <div id='create-request-main'>
            <div id='create-request-container'>
                <div id='pending-button' className='pending-button-non-current' onClick={() => navigate('/request/pending')}>Pending</div>
                <div id='complete-button' className='pending-button-non-current' onClick={() => navigate('/request/complete')}>Complete</div>
                <div id='create-new-button' className='pending-button-current'>Create New</div>
                
                <div id='pending-request-body'>          
                    {/* <form onSubmit={createTicket} style={{ width: "50%", transform: "translateX(50%)", position: "relative" }}> */}
                    <div>
                        <label htmlFor="request-type">Request Type: </label>
                        <select type="dropdown" id="request-type" defaultValue={'DEFAULT'} onChange={handlePTOTypeSelect}>
                            <option value="DEFAULT" disabled={true} hidden={true}>Choose a type ...</option>
                            {requestTypes.map((type, key) => {
                                return (
                                    <option key={key} value={type.pto_type_id} onSelect={() => handlePTOTypeSelect}>{type.pto_type}</option>
                                );
                            })}
                        </select>

                        <div ref={errRef} style={{color: "red", fontWeight: "bold"}}>{errMsg === "" ? <br /> : errMsg}</div>
                        
                    </div>
                    {(selectedType !== -1 && errMsg === "") ? <GetForm /> : <></>}
                </div>
            </div>   
        </div>
    )
}

export default CreateRequest;