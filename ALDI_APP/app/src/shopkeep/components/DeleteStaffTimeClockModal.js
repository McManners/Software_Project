import React, { useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';
import { useNavigate } from 'react-router-dom';
import './DeleteStaffTimeClockModal.css';

const DeleteStaffTimeClockModal = ({ staffToDelete, setStaffToDelete }) => {
    console.log('deleting: ' + staffToDelete)
    if (staffToDelete === null)
    return (<></>)
    console.log('not null');

    return (
        <div className='DeleteStaffTimeClockModal_Dialog' style={ staffToDelete !== null ? {display: 'block'} : {display: 'none'} } onClick={() => setStaffToDelete(null)}>
            <div className='DeleteStaffTimeClockModal_Dialog_Backdrop'></div>
            <div className='DeleteStaffTimeClockModal_Dialog_Container' onClick={e => e.stopPropagation()}>
                <div className='DeleteStaffTimeClockModal_Dialog_Header'>
                    <h4>Delete</h4>
                    <div>
                        <button className='DeleteStaffTimeClockModal_Dialog_Close_Button'>
                            <IconContext.Provider value={{ style: { verticalAlign: 'middle' }, size: '1.4em' }}>
                                <IoMdClose onClick={() => setStaffToDelete(null)} className='DeleteStaffTimeClockModal_Dialog_Close_Icon' />
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
                <div className='DeleteStaffTimeClockModal_Dialog_Content'>
                    <div className='DeleteStaffTimeClockModal_Text'>
                        Are you sure you want to delete this shift?
                    </div>
                    <div className='DeleteStaffTimeClockModal_Data'>
                        {
                            `${staffToDelete['From']} to ${staffToDelete['To']}`
                        }
                        <br />
                        {
                            `Total: ${staffToDelete['Hours']} hours`
                        }
                    </div>
                    <div className='DeleteStaffTimeClockModal_Buttons_Wrapper'>
                        <button type='button' className='DeleteStaffTimeClockModal_Cancel_Button' onClick={() => setStaffToDelete(null)}>Cancel</button>
                        <button type='button' className='DeleteStaffTimeClockModal_Continue_Button'onClick={() => console.log('Deleted timeclock... ' + staffToDelete)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteStaffTimeClockModal;