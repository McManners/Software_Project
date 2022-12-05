import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './createrequestwithcalendar.css';
import axios from 'axios';
import Calendar from './Calendar';
import useAxiosPrivate from '../useAxiosPrivate';
import useAuth from '../useAuth';

const CreateRequestWithCalendar = () => {
    const navigate = useNavigate();
    const [requestNote, setRequestNote] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const date = new Date();
    const errRef = useRef();
    const axiosPrivate = useAxiosPrivate();
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth() - 1);
    const [selectedYear, setSelectedYear] = useState(date.getFullYear());
    // These are passed to <Calendar/> as props
    const [selectedPTOType, setSelectedPTOType] = useState(0);
    const { auth } = useAuth();
    const location = useLocation();
    const [ptoBalance, setPTOBalance] = useState(null);

    const handleRequestNoteChange = event => {
        console.log("blur triggered");
        setRequestNote(event.target.value);
    }
    useEffect(() => {
        // https://github.com/gitdagray/react_persist_login/blob/main/src/components/Users.js
        let isMounted = true;
        const controller = new AbortController();

        const getPTOBalance = async () => {
            // https://flaviocopes.com/axios-send-authorization-header
            try {
                const response = await axiosPrivate.get('ptobalance', {
                    access_token: auth.access_token
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth.access_token}`
                    }
                });
                console.log(response.data);
                isMounted && setPTOBalance(response.data);
            } catch (err) {
                console.log(err);
                // logout();
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getPTOBalance();
        console.log("hey")
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const createTicket = async () => {
        // https://flaviocopes.com/axios-send-authorization-header
        try {
            const response = await axiosPrivate.post('/ticket/create', {
                access_token: auth.access_token,
                date: selectedDays,
                pto_type_id: selectedPTOType,
                request_note: requestNote
            },
            {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });
        } catch (err) {
            console.log(err);
            if (err.status === 403) navigate('/login', { state: { from: location }, replace: true });
        }
    }

    
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
                        style={{background: `conic-gradient(red 0deg ${ptoBalance.personal_taken === 0 ? 0 : 360 / ptoBalance.Accrual_Bracket.max_personal - ptoBalance.personal_taken}deg, green ${ptoBalance.personal_taken === 0 ? 0 : 360 / ptoBalance.Accrual_Bracket.max_personal - ptoBalance.personal_taken}deg 360deg`
                            }}
                        >
                        <div className="create-calendar-hole">{ptoBalance.Accrual_Bracket.max_personal - ptoBalance.personal_taken}</div>
                    </div>
                </div>
                <div className='create-calendar-donut-item'>
                    <h5>Vacation Remaining</h5>
                    <div className="create-calendar-donut"
                        style={{background: `conic-gradient(green 0deg ${ptoBalance.vacation_taken === 0 ? 0 : 360 / ptoBalance.Accrual_Bracket.max_vacation_per_year - ptoBalance.vacation_taken}deg, red ${ptoBalance.vacation_taken === 0 ? 0 : 360 / ptoBalance.Accrual_Bracket.max_vacation_per_year - ptoBalance.vacation_taken}deg 360deg`
                    }}
                    >
                        <div className="create-calendar-hole">{ptoBalance.Accrual_Bracket.max_vacation_per_year - ptoBalance.vacation_taken}</div>
                    </div>
                </div>
                <div className='create-calendar-donut-item'>
                    <h5>Sick Remaining</h5>
                    <div className="create-calendar-donut"
                        style={{background: `conic-gradient(red 0deg ${ptoBalance.sick_taken === 0 ? 0 : 360 / ptoBalance.Accrual_Bracket.sick_per_year - ptoBalance.sick_taken}deg, green ${ptoBalance.sick_taken === 0 ? 0 : 360 / ptoBalance.Accrual_Bracket.sick_per_year - ptoBalance.sick_taken}deg 360deg`
                    }}
                    >
                        <div className="create-calendar-hole">{ptoBalance.Accrual_Bracket.sick_per_year - ptoBalance.sick_taken}</div>
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
                        <select type="dropdown" id="create-calendar-request-type" onChange={handlePTOSelect} defaultValue={selectedPTOType}>
                            <option value={0} disabled hidden>Choose a type ...</option>
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


    console.log(ptoBalance);
    return (
        <div id='create-calendar-request-main'>
            <div id='create-calendar-request-container'>
                <div id='create-calendar-request-pending-body'>
                    {(ptoBalance !== null && ptoBalance !== undefined) ? <GetForm /> : <div>Loading...</div>}
                </div>
            </div>   
        </div>
    )
}

export default CreateRequestWithCalendar;