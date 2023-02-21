import React, { useState } from 'react';
import axios from 'axios';
import './newemployee.css';
import { useNavigate } from 'react-router-dom';

const NewEmployee = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(
        {
            "employeeId": 1,
            "firstName": "Anthony",
            "lastName": "Salerno",
            "email": "anthony@gmail.com",
        }
    )
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [registerCode, setRegisterCode] = useState("");
    const [role, setRole] = useState("Cashier");

    const handleFirstNameChange = event => {
        event.preventDefault();
        setFirstName(event.target.value);
    }
    const handleLastNameChange = event => {
        event.preventDefault();
        setLastName(event.target.value);
    }
    const handleEmailChange = event => {
        event.preventDefault();
        setEmail(event.target.value);
    }
    const handlePhoneChange = event => {
        event.preventDefault();
        setPhone(event.target.value);
    }
    const handleRegisterCodeChange = event => {
        event.preventDefault();
        setRegisterCode(event.target.value);
    }
    const handleRoleChange = event => {
        event.preventDefault();
        setRole(event.target.value);
    }
    return (
        <div className="NewEmployee">
            <div className="NewEmployee_Header">
                <span className="NewEmployee_Header_Title">New Employee</span>
            </div>
            <div className="NewEmployee_Content_Container">
                <div className="NewEmployee_Panel">
                    <div className="NewEmployee_Panel_Header">
                        <span className="NewEmployee_Panel_Header_Title">Employee Details</span>
                    </div>
                    <div className="NewEmployee_Panel_Container">
                        <div className="NewEmployee_Panel_Flex">
                            <div className="NewEmployee_Panel_Flex_Row">
                                <div className="NewEmployee_Panel_Flex_Row_Item">
                                    <div className="NewEmployee_Panel_Flex_Row_Item_Input_Label_Wrapper">
                                        <label htmlFor="NewEmployee_FirstName" className="NewEmployee_Panel_Flex_Row_Item_Input_Label">First Name</label>
                                    </div>
                                    <div className="NewEmployee_Panel_Flex_Row_Item_Input_Wrapper">
                                        <input type="text" id="NewEmployee_FirstName" 
                                            className="NewEmployee_Panel_Flex_Row_Item_Input" 
                                            value={firstName}
                                            onChange={handleFirstNameChange} />
                                    </div>
                                </div>
                                <div className="NewEmployee_Panel_Flex_Row_Item">
                                    <div className="NewEmployee_Panel_Flex_Row_Item_Input_Label_Wrapper">
                                        <label htmlFor="NewEmployee_LastName" className="NewEmployee_Panel_Flex_Row_Item_Input_Label">Last Name</label>
                                    </div>
                                    <div className="NewEmployee_Panel_Flex_Row_Item_Input_Wrapper">
                                        <input type="text" id="NewEmployee_LastName"
                                            className="NewEmployee_Panel_Flex_Row_Item_Input" 
                                            value={lastName}
                                            onChange={handleLastNameChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="NewEmployee_Panel_Flex_Row">
                                <div className="NewEmployee_Panel_Flex_Row_Item">
                                    <div className="NewEmployee_Panel_Flex_Row_Item_Input_Label_Wrapper">
                                        <label htmlFor="NewEmployee_EmailName" className="NewEmployee_Panel_Flex_Row_Item_Input_Label">Email</label>
                                    </div>
                                    <div className="NewEmployee_Panel_Flex_Row_Item_Input_Wrapper">
                                        <input type="text" id="NewEmployee_Email"
                                            className="NewEmployee_Panel_Flex_Row_Item_Input" 
                                            value={email}
                                            onChange={handleEmailChange} />
                                    </div>
                                </div>
                                <div className="NewEmployee_Panel_Flex_Row_Item">
                                    <div className="NewEmployee_Panel_Flex_Row_Item_Input_Label_Wrapper">
                                        <label htmlFor="NewEmployee_Phone" className="NewEmployee_Panel_Flex_Row_Item_Input_Label" value={phone}>Phone</label>
                                    </div>
                                    <div className="NewEmployee_Panel_Flex_Row_Item_Input_Wrapper">
                                        <input type="text" id="NewEmployee_Phone"
                                            className="NewEmployee_Panel_Flex_Row_Item_Input" 
                                            value={phone}
                                            onChange={handlePhoneChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="NewEmployee_Panel">
                    <div className="NewEmployee_Panel_Header">
                        <span className="NewEmployee_Panel_Header_Title">Register Access</span>
                    </div>
                    <div className="NewEmployee_Panel_Container">
                        <div className="NewEmployee_Panel_Flex">
                            <div className="NewEmployee_Panel_Flex_Row">
                                <div className="NewEmployee_Panel_Flex_Row_Item">
                                    <div className="NewEmployee_Panel_Flex_Row_Item_Input_Label_Wrapper">
                                        <label htmlFor="NewEmployee_RegisterCode" className="NewEmployee_Panel_Flex_Row_Item_Input_Label">Register Code</label>
                                    </div>
                                    <div className="NewEmployee_Panel_Flex_Row_Item_Input_Wrapper">
                                        <input type="text" placeholder="4 digits"
                                            id="NewEmployee_RegisterCode"
                                            className="NewEmployee_Panel_Flex_Row_Item_Input" 
                                            value={registerCode}
                                            onChange={handleRegisterCodeChange} />
                                    </div>
                                </div>
                                <div className="NewEmployee_Panel_Flex_Row_Item">
                                    <div className="NewEmployee_Panel_Flex_Row_Item_Input_Label_Wrapper">
                                        <label htmlFor="NewEmployee_Role" className="NewEmployee_Panel_Flex_Row_Item_Input_Label">Role</label>
                                    </div>
                                    <div className="NewEmployee_Panel_Flex_Row_Item_Input_Wrapper">
                                        <select className="NewEmployee_Panel_Flex_Row_Item_Input" 
                                            id="NewEmployee_Role" 
                                            value={role}
                                            onChange={handleRoleChange}>
                                            <option value="Cashier" className="NewEmployee_Panel_Role_Select_Option">Cashier</option>
                                            <option value="Manager" className="NewEmployee_Panel_Role_Select_Option">Manager</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="NewEmployee_Panel">
                    <div className="NewEmployee_Panel_Header">
                        <span className="NewEmployee_Panel_Header_Title">BackOffice Access</span>
                        <span className="NewEmployee_Panel_BackOffice_Checkbox_Wrapper">
                            <input type="checkbox" className="NewEmployee_Panel_BackOffice_Header_Checkbox" />
                        </span>
                    </div>
                </div>
                <div className='NewEmployee_Footer'>
                    <div className='NewEmployee_Footer_Container'>
                            <button type='button' className='NewEmployee_Footer_Button_Cancel' onClick={() => navigate('/salerno/staff/timeclock')}>
                                Cancel
                            </button>
                            <button type='button' className='NewEmployee_Footer_Button_Save'>
                                Save
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewEmployee;