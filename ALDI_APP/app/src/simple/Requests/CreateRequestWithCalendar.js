import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './createrequestwithcalendar.css';
import Calendar from './Calendar';
import useAxiosPrivate from '../useAxiosPrivate';
import useAuth from '../useAuth';

const CreateRequestWithCalendar = (props) => {
    console.log(props.selectedDays);
    
    const navigate = useNavigate();
    const [requestNote, setRequestNote] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const date = new Date();
    const errRef = useRef();
    const axiosPrivate = useAxiosPrivate();
    const [selectedDays, setSelectedDays] = useState(props.selectedDays === undefined ? [] : props.selectedDays);
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
    const [selectedYear, setSelectedYear] = useState(date.getFullYear());
    // These are passed to <Calendar/> as props
    const [selectedPTOType, setSelectedPTOType] = useState(1);
    const { auth } = useAuth();
    const location = useLocation();
    const [ptoBalance, setPTOBalance] = useState(null);

    const handleRequestNoteChange = event => {
        event.preventDefault();
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
                pto_type_id: parseInt(selectedPTOType),
                request_note: requestNote
            },
            {
                headers: {
                    'Authorization': `Bearer ${auth.access_token}`
                }
            });
            if (response.status === 201) navigate('/', { state: { from: location }, replace: true });
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
        return (
            <div className='create-request-calendar-selected-days'>
                {selectedDays.map(e => {
                    return (
                        <div key={e}>{new Date(e).toDateString()}</div>
                    );
                })}
            </div>
        )
    }

    const CalendarStats = () => {
        return (
            <div className='create-calendar-stats-container'>
                <div className='create-calendar-right-container-header'>Available Paid Time Off</div>
                <div className='create-calendar-stats'>
                    <div className='create-calendar-donut-item'>
                        <div className="create-calendar-donut"
                            style={{background: `conic-gradient(red 0deg ${ptoBalance.personal_taken === 0 ? 0 : (360 / ptoBalance.Accrual_Bracket.max_personal - ptoBalance.personal_taken) * ptoBalance.personal_taken}deg, green ${ptoBalance.personal_taken === 0 ? 0 : 360 / ptoBalance.Accrual_Bracket.max_personal - ptoBalance.personal_taken}deg 360deg`
                                }}
                            >
                            <div className="create-calendar-hole">{ptoBalance.Accrual_Bracket.max_personal - ptoBalance.personal_taken}</div>
                        </div>
                        <div className='stats-header'>Personal</div>
                    </div>
                    <div className='create-calendar-donut-item'>
                        <div className="create-calendar-donut"
                            style={{background: `conic-gradient(green 0deg ${ptoBalance.vacation_taken === 0 ? 0 : (360 / ptoBalance.Accrual_Bracket.max_vacation_per_year - ptoBalance.vacation_taken) * ptoBalance.vacation_taken}deg, red ${ptoBalance.vacation_taken === 0 ? 0 : 360 / ptoBalance.Accrual_Bracket.max_vacation_per_year - ptoBalance.vacation_taken}deg 360deg`
                        }}>
                            <div className="create-calendar-hole">{ptoBalance.Accrual_Bracket.max_vacation_per_year - ptoBalance.vacation_taken}</div>
                        </div>
                        <div className='stats-header'>Vacation</div>
                    </div>
                    <div className='create-calendar-donut-item'>
                        <div className="create-calendar-donut"
                            style={{background: `conic-gradient(red 0deg ${ptoBalance.sick_taken === 0 ? 0 : (  360 / ptoBalance.Accrual_Bracket.max_sick - ptoBalance.sick_taken) * ptoBalance.sick_taken}deg, green ${ptoBalance.sick_taken === 0 ? 0 : 360 / ptoBalance.Accrual_Bracket.max_sick - ptoBalance.sick_taken}deg 360deg`
                        }}
                        >
                            <div className="create-calendar-hole">{ptoBalance.Accrual_Bracket.max_sick - ptoBalance.sick_taken}</div>
                        </div>
                        <div className='stats-header'>Sick</div>
                    </div>
                </div>
            </div>
        )
    }
    const getValue = () => {
        return (
            requestNote === "" ? 
                <textarea rows="2" id="create-calendar-request-note-input" placeholder="Add an optional note..." onBlur={handleRequestNoteChange}/> :
                <textarea rows="2" id="create-calendar-request-note-input" defaultValue={requestNote} onBlur={handleRequestNoteChange}/>
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
                    
                    <div className='create-calendar-request-type'>
                        <div className='create-calendar-right-container-header'>Paid Time Off Type</div>
                        <div className='create-calendar-select-div'>
                            <select type="dropdown" onChange={handlePTOSelect} defaultValue={selectedPTOType}>
                                <option value={1} disabled={(ptoBalance.Accrual_Bracket.max_vacation_per_year - ptoBalance.vacation_taken === 0)}>Vacation</option>
                                <option value={2} disabled={(ptoBalance.Accrual_Bracket.max_personal - ptoBalance.personal_taken === 0)}>Personal</option>
                                <option value={3} disabled={(ptoBalance.Accrual_Bracket.sick_per_year - ptoBalance.sick_taken === 0)}>Sick</option>
                            </select>
                        </div>
                    </div>
                    <div className='selected-days create-request-item-height'>
                        <div className='create-calendar-right-container-header'>Selected Days</div>
                        {renderSelectedDays()}
                    </div>
                    <div className='create-calendar-request-item-note'>
                        <div className='create-calendar-right-container-header'>Request Note</div>
                        {getValue()}
                    </div>
                    <button type="button" onClick={createTicket} id='create-calendar-ticket-button'>Create Ticket</button>
                </div>
            </div>
        )
    }


    console.log(ptoBalance);
    return (
        (ptoBalance !== null && ptoBalance !== undefined) ? <GetForm /> : <div>Loading...</div>
    )
}

export default CreateRequestWithCalendar;