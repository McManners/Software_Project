import React, { useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';

const SupportDialog_ShopKeep = ({ supportOpen, setSupportOpen }) => {

    return (
        <div className='DashHeader_Dialog_ShopKeep' style={ supportOpen ? {display: 'block'} : {display: 'none'} } onClick={() => setSupportOpen(false)}>
            <div className='DashHeader_Dialog_Container_ShopKeep' onBlur={() => setSupportOpen(false)}>
                <div className='DashHeader_Dialog_Header_ShopKeep'>
                    <span>Support</span>
                    <div style={{flexGrow: '1'}}></div>
                    <div>
                        <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                            <IoMdClose onClick={() => setSupportOpen(true)} className='DashHeader_Dialog_Close_Icon_ShopKeep' />
                        </IconContext.Provider>
                    </div>
                </div>
                <div className='DashHeader_Dialog_Content_ShopKeep'>
                    <div className='DashHeader_Dialog_Content_Left_ShopKeep'>
                        <div style={{fontSize: '0.9rem', textAlign: 'left', fontWeight: '400', marginBottom: '10px'}}>Find answers on our support site</div>

                        <div style={{fontSize: '0.8rem', textAlign: 'left', fontWeight: 'lighter'}}>
                            Search our detailed collection of articles, guides, and videos covering everything ALDI.
                        </div>
                    </div>
                    <div className='DashHeader_Dialog_Content_Right_ShopKeep'>
                        We're here to help 24/7.
                        <br/>
                        <br/>
                    </div>
                </div>
                <div className='DashHeader_Dialog_Buttons_ShopKeep'>
                    <button id='support-button' className='DashHeader_Dialog_Button_ShopKeep'>Visit Support</button>
                </div>
            </div>
        </div>
    )
}

export default SupportDialog_ShopKeep;