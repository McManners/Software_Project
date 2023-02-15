import React, { useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';
import { useNavigate } from 'react-router-dom';
import './edittimeclock.css';

const EditTimeClock = ({ timeClockToEdit, setTimeClockToEdit }) => {

    return (
        <div className='EditTimeClock' onClick={() => setTimeClockToEdit(null)}>
            <div className='EditTimeClock_Backdrop'></div>
            <div className='EditTimeClock_Container' onClick={e => e.stopPropagation()}>
                <div className='EditTimeClock_Header'>
                    <h4>Edit Work Shift</h4>
                    <div>
                        <button className='EditTimeClock_Close_Button' onClick={() => setTimeClockToEdit(null)}>
                            <IconContext.Provider value={{ style: { verticalAlign: 'middle' }, size: '1.4em' }}>
                                <IoMdClose className='EditTimeClock_Close_Icon' />
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
                <div className='EditTimeClock_Content'>
                    <div className='EditTimeClock_Top'>
                        <div className='EditTimeClock_Top_Left'>
                            <div className='EditTimeClock_Content_Label'>Time in</div>
                            <input type='text' className='NewBasicItem_Input' placeholder={timeClockToEdit['In'].split(" ")[0]}/>
                            <input type='text' className='NewBasicItem_Input' placeholder={timeClockToEdit['In'].split(" ")[1]}/>
                        </div>
                        <div className='EditTimeClock_Top_Right'>
                            <div className='EditTimeClock_Content_Label'>Time Out</div>
                            <input type='text' className='NewBasicItem_Input' placeholder={timeClockToEdit['Out'].split(" ")[0]}/>
                            <input type='text' className='NewBasicItem_Input' placeholder={timeClockToEdit['Out'].split(" ")[1]}/>
                        </div>
                    </div>
                    <div className='EditTimeClock_Middle'>
                        <div className='EditTimeClock_Middle_Left'>
                            <div className='EditTimeClock_Content_Label'>
                                Employee Name
                            </div>
                            <input type='text' className='EditTimeClock_Input' />
                        </div>
                        <div className='EditTimeClock_Middle_Right'>
                            <div className='EditTimeClock_Content_Label'>
                                Total Hours
                            </div>
                            <div className='EditTimeClock_Hours_Label'>
                                5.25 hours
                            </div>
                        </div>
                    </div>
                </div>
                <div className='EditTimeClock_Bottom'>
                    <div className='EditTimeClock_Delete_Button_Wrapper'>
                        <button type='button' className='EditTimeClock_Delete_Button' onClick={() => console.log('Deleting timeclock')}>Delete shift</button>
                    </div>
                    <div className='EditTimeClock_Footer_Button_Container'>
                        <button type='button' className='EditTimeClock_Cancel_Button' onClick={() => setTimeClockToEdit(null)}>Cancel</button>
                        <button type='button' className='EditTimeClock_Save_Button' onClick={() => console.log('Editing timeclock')}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTimeClock;