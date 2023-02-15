import React, { useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';

const SupportDialog = ({ supportOpen, setSupportOpen }) => {

    return (
        <div className='header-dialog' style={ supportOpen ? {display: 'block'} : {display: 'none'} } onClick={() => setSupportOpen(false)}>
            <div className='header-dialog-container' onBlur={() => setSupportOpen(false)}>
                <div className='header-dialog-header'>
                    <span>Support</span>
                    <div style={{flexGrow: '1'}}></div>
                    <div>
                        <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                            <IoMdClose onClick={() => setSupportOpen(true)} className='header-dialog-close-icon' />
                        </IconContext.Provider>
                    </div>
                </div>
                <div className='header-dialog-content'>
                    <div className='header-dialog-content-left'>
                        <div style={{fontSize: '0.9rem', textAlign: 'left', fontWeight: '400', marginBottom: '10px'}}>Find answers on our support site</div>

                        <div style={{fontSize: '0.8rem', textAlign: 'left', fontWeight: 'lighter'}}>
                            Search our detailed collection of articles, guides, and videos covering everything ALDI.
                        </div>
                    </div>
                    <div className='header-dialog-content-right'>
                        We're here to help 24/7.
                        <br/>
                        <br/>
                    </div>
                </div>
                <div className='header-dialog-buttons'>
                    <button id='support-button' className='header-dialog-button'>Visit Support</button>
                </div>
            </div>
        </div>
    )
}

export default SupportDialog;