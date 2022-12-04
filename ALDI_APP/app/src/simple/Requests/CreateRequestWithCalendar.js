import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './createrequestwithcalendar.css';
import axios from 'axios';
import Calendar from './Calendar';

const CreateRequestWithCalendar = () => {
    const navigate = useNavigate();
    const [requestNote, setRequestNote] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const date = new Date();
    const errRef = useRef();

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
    // These are passed to <Calendar/> as props
    const [selectedPTOType, setSelectedPTOType] = useState(0);

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
                eid: 1,
                date: selectedDays,
                pto_type_id: selectedPTOType,
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
    const handlePTOSelect = event => {
        event.preventDefault();
        console.log(event.target.value);
        setSelectedPTOType(event.target.value);
    }
    const renderSelectedDays = () => {
        let days = "";
        selectedDays.forEach(e => {
            days += (`${e}, `);
        })
        return (
            <div>
                Selected Days: <br/>{days}
            </div>
        )
    }
    const CalendarStats = () => {
        return (
            <div className='create-calendar-stats'>
                <div className='create-calendar-donut-item'>
                    <h5>Vacation Remaining</h5>
                    <div className="create-calendar-donut"
                        style={{background: 
                            "conic-gradient(white 0deg 160deg, blue 160deg 360deg"
                            }}>
                        <div className="create-calendar-hole">8</div>
                    </div>
                </div>
                <div className='create-calendar-donut-item'>
                    <h5>Vacation Remaining</h5>
                    <div className="create-calendar-donut"
                        style={{background: 
                            "conic-gradient(white 0deg 160deg, blue 160deg 360deg"
                            }}>
                        <div className="create-calendar-hole">5</div>
                    </div>
                </div>
                <div className='create-calendar-donut-item'>
                    <h5>Vacation Remaining</h5>
                    <div className="create-calendar-donut"
                        style={{background: 
                            `conic-gradient(white 0deg ${360 / 7}deg, blue ${360 / 7}deg 360deg`
                            }}>
                        <div className="create-calendar-hole">7</div>
                    </div>
                </div>
            </div>
        )
    }
    const GetForm = () => {
        return (
            <div className='create-calendar-req-cont'>
                    <div className='create-calendar-cal-container'>
                        <Calendar 
                            setSelectedDays={setSelectedDays} 
                            selectedDays={selectedDays} 
                            setSelectedMonth={setSelectedMonth}
                            selectedMonth={selectedMonth}
                            setSelectedYear={setSelectedYear}
                            selectedYear={selectedYear}
                        />
                    </div>
                <div className='create-calendar-right'>
                    <CalendarStats />
                    
                    <div>
                        <label htmlFor="create-calendar-request-type">Request Type: </label>
                        <select type="dropdown" id="create-calendar-request-type" onChange={handlePTOSelect} defaultValue='DEFAULT'>
                            <option value="DEFAULT" disabled hidden>Choose a type ...</option>
                            <option value={1}>Vacation</option>
                            <option value={2}>Personal</option>
                            <option value={3}>Sick</option>
                        </select>
                        <div ref={errRef} style={{color: "red", fontWeight: "bold"}}>{errMsg === "" ? <br /> : errMsg}</div> 
                    </div>
                    <div className='create-calendar-request-item'>
                        {renderSelectedDays()}
                    </div>
                    <div className='create-calendar-request-item'>
                        <div style={{ borderBottom: "2px solid blue", fontSize: "1.5rem", fontWeight: "bold" }}>
                            <label htmlFor="calendar-request-note-input">Request Note: </label>
                        </div>
                        <textarea rows="2" id="create-calendar-request-note-input" placeholder="Add an optional note..." onBlur={handleRequestNoteChange} />
                    </div>
                    <button type="button" onClick={createTicket} id='create-calendar-ticket-button'>Create Ticket</button>
                </div>
                
                
            </div>
        )
    }



    return (
        <div>
            <body className="calendar-container-body">
                <div className="calendar-container-11">
                                {/*<div id='create-calendar-request-pending-button' className='create-calendar-request-pending-button-non-current' onClick={() => navigate('/dashboard/pending')}>Pending</div>*/}
                                {/*<div id='create-calendar-request-complete-button' className='create-calendar-request-pending-button-non-current' onClick={() => navigate('/dashboard/complete')}>Complete</div>*/}
                                {/*<div id='create-calendar-request-create-new-button' className='create-calendar-request-pending-button-current'>Create New</div>*/}
                                <div id='create-calendar-request-pending-body'>
                                    <GetForm />
                                </div>
                </div>
            </body>





        {/*<div id='create-calendar-request-main'>*/}
        {/*    <div id='create-calendar-request-container'>*/}
        {/*        <div id='create-calendar-request-pending-button' className='create-calendar-request-pending-button-non-current' onClick={() => navigate('/dashboard/pending')}>Pending</div>*/}
        {/*        <div id='create-calendar-request-complete-button' className='create-calendar-request-pending-button-non-current' onClick={() => navigate('/dashboard/complete')}>Complete</div>*/}
        {/*        <div id='create-calendar-request-create-new-button' className='create-calendar-request-pending-button-current'>Create New</div>*/}
        {/*        <div id='create-calendar-request-pending-body'>*/}
        {/*            <GetForm />*/}
        {/*        </div>*/}
        {/*    </div>   */}
        {/*</div>*/}
        </div>
    )
}

export default CreateRequestWithCalendar;