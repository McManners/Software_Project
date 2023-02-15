import './dashboard_ShopKeep.css';
import { BsPersonCircle, BsCaretDownFill } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { AiFillQuestionCircle } from 'react-icons/ai';

const DashHeader_ShopKeep = ({ name, setSupportOpen, setNavOpen }) => {
    const [dropdown, setDropdown] = useState(false);
    const date = new Date();
    const signOut = () => {
        console.log('loggin out...');
    }
    
    return (
        <div className='DashHeader_ShopKeep'>
            <div>
                <IconContext.Provider value={{ style: { verticalAlign: 'middle' },  size: '1.5em' }}>
                    <BiMenu className='DashHeader_Hamburger_Icon_ShopKeep' onClick={() => setNavOpen(prev => !prev)} />
                </IconContext.Provider>
            </div>
            <div className='DashHeader_Title_ShopKeep'>Salerno's Red Hots</div>
            <div style={{flexGrow: '1'}}></div>
            <div className='DashHeader_Support_ShopKeep'>
                <IconContext.Provider value={{ style: { verticalAlign: 'middle' },  size: '1.1em' }}>
                    <AiFillQuestionCircle onClick={() => setSupportOpen(true)} className='DashHeader_Support_Icon_ShopKeep' />
                </IconContext.Provider>
            </div>
            <div className='DashHeader_Dropdown_ShopKeep' onClick={() => setDropdown(prev => !prev)}>
                <div className='DashHeader_User_Header_ShopKeep' key={'hey'}>
                    <IconContext.Provider value={{ style: { verticalAlign: 'middle' },  size: '1.2em' }}>
                        <BsPersonCircle className='DashHeader_User_Icon_ShopKeep' />
                    </IconContext.Provider>
                        {name/* {`${auth.first_name} ${auth.last_name}`} */}
                    <IconContext.Provider value={{ style: { verticalAlign: 'middle'}, size: '0.75em' }}>
                        <BsCaretDownFill className='DashHeader_Dropdown_Icon_ShopKeep' />
                    </IconContext.Provider>
                </div>
                <div className='DashHeader_Dropdown_Content_ShopKeep' style={{display: (dropdown ? 'block' : 'none')}}>
                    <div>{date.toDateString()}</div>
                    <div className='DashHeader_Dropdown_Logout_ShopKeep' onClick={signOut}><span>Logout</span></div>
                </div>
            </div>
        </div>
    )
}
export default DashHeader_ShopKeep;