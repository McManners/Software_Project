import React, { useState } from 'react';
import axios from 'axios';
import './editemployee.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
    const [employee, setEmployee] = useState(
        {
            "employeeId": 1,
            "firstName": "Anthony",
            "lastName": "Salerno",
            "email": "anthony@gmail.com",
            "phone": "6303622052",
            "registerCode": 6553,
            "role": "Manager"
        }
    )
    const [firstName, setFirstName] = useState(employee.firstName);
    const [lastName, setLastName] = useState(employee.lastName);
    const [email, setEmail] = useState(employee.email);
    const [phone, setPhone] = useState(employee.phone);
    const [registerCode, setRegisterCode] = useState(employee.registerCode);
    const [role, setRole] = useState(employee.role);

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
        <div className="EditEmployee">
            <div className="EditEmployee_Header">
                <span className="EditEmployee_Header_Title">Edit Employee</span>
            </div>
            <div className="EditEmployee_Content_Container">
                <div className="EditEmployee_Panel">
                    <div className="EditEmployee_Panel_Header">
                        <span className="EditEmployee_Panel_Header_Title">Employee Details</span>
                    </div>
                    <div className="EditEmployee_Panel_Container">
                        <div className="EditEmployee_Panel_Flex">
                            <div className="EditEmployee_Panel_Flex_Row">
                                <div className="EditEmployee_Panel_Flex_Row_Item">
                                    <div className="EditEmployee_Panel_Flex_Row_Item_Input_Label_Wrapper">
                                        <label htmlFor="EditEmployee_FirstName" className="EditEmployee_Panel_Flex_Row_Item_Input_Label">First Name</label>
                                    </div>
                                    <div className="EditEmployee_Panel_Flex_Row_Item_Input_Wrapper">
                                        <input type="text" id="EditEmployee_FirstName" 
                                            className="EditEmployee_Panel_Flex_Row_Item_Input" 
                                            value={firstName}
                                            onChange={handleFirstNameChange} />
                                    </div>
                                </div>
                                <div className="EditEmployee_Panel_Flex_Row_Item">
                                    <div className="EditEmployee_Panel_Flex_Row_Item_Input_Label_Wrapper">
                                        <label htmlFor="EditEmployee_LastName" className="EditEmployee_Panel_Flex_Row_Item_Input_Label">Last Name</label>
                                    </div>
                                    <div className="EditEmployee_Panel_Flex_Row_Item_Input_Wrapper">
                                        <input type="text" id="EditEmployee_LastName"
                                            className="EditEmployee_Panel_Flex_Row_Item_Input" 
                                            value={lastName}
                                            onChange={handleLastNameChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="EditEmployee_Panel_Flex_Row">
                                <div className="EditEmployee_Panel_Flex_Row_Item">
                                    <div className="EditEmployee_Panel_Flex_Row_Item_Input_Label_Wrapper">
                                        <label htmlFor="EditEmployee_EmailName" className="EditEmployee_Panel_Flex_Row_Item_Input_Label">Email</label>
                                    </div>
                                    <div className="EditEmployee_Panel_Flex_Row_Item_Input_Wrapper">
                                        <input type="text" id="EditEmployee_Email"
                                            className="EditEmployee_Panel_Flex_Row_Item_Input" 
                                            value={email}
                                            onChange={handleEmailChange} />
                                    </div>
                                </div>
                                <div className="EditEmployee_Panel_Flex_Row_Item">
                                    <div className="EditEmployee_Panel_Flex_Row_Item_Input_Label_Wrapper">
                                        <label htmlFor="EditEmployee_Phone" className="EditEmployee_Panel_Flex_Row_Item_Input_Label" value={phone}>Phone</label>
                                    </div>
                                    <div className="EditEmployee_Panel_Flex_Row_Item_Input_Wrapper">
                                        <input type="text" id="EditEmployee_Phone"
                                            className="EditEmployee_Panel_Flex_Row_Item_Input" 
                                            value={phone}
                                            onChange={handlePhoneChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="EditEmployee_Panel">
                    <div className="EditEmployee_Panel_Header">
                        <span className="EditEmployee_Panel_Header_Title">Register Access</span>
                    </div>
                    <div className="EditEmployee_Panel_Container">
                        <div className="EditEmployee_Panel_Flex">
                            <div className="EditEmployee_Panel_Flex_Row">
                                <div className="EditEmployee_Panel_Flex_Row_Item">
                                    <div className="EditEmployee_Panel_Flex_Row_Item_Input_Label_Wrapper">
                                        <label htmlFor="EditEmployee_RegisterCode" className="EditEmployee_Panel_Flex_Row_Item_Input_Label">Register Code</label>
                                    </div>
                                    <div className="EditEmployee_Panel_Flex_Row_Item_Input_Wrapper">
                                        <input type="text" placeholder="4 digits"
                                            id="EditEmployee_RegisterCode"
                                            className="EditEmployee_Panel_Flex_Row_Item_Input" 
                                            value={registerCode}
                                            onChange={handleRegisterCodeChange} />
                                    </div>
                                </div>
                                <div className="EditEmployee_Panel_Flex_Row_Item">
                                    <div className="EditEmployee_Panel_Flex_Row_Item_Input_Label_Wrapper">
                                        <label htmlFor="EditEmployee_Role" className="EditEmployee_Panel_Flex_Row_Item_Input_Label">Role</label>
                                    </div>
                                    <div className="EditEmployee_Panel_Flex_Row_Item_Input_Wrapper">
                                        <select className="EditEmployee_Panel_Flex_Row_Item_Input" 
                                            id="EditEmployee_Role" 
                                            value={role}
                                            onChange={handleRoleChange}>
                                            <option value="Cashier" className="EditEmployee_Panel_Role_Select_Option">Cashier</option>
                                            <option value="Manager" className="EditEmployee_Panel_Role_Select_Option">Manager</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="EditEmployee_Panel">
                    <div className="EditEmployee_Panel_Header">
                        <span className="EditEmployee_Panel_Header_Title">BackOffice Access</span>
                        <span className="EditEmployee_Panel_BackOffice_Checkbox_Wrapper">
                            <input type="checkbox" className="EditEmployee_Panel_BackOffice_Header_Checkbox" />
                        </span>
                    </div>
                </div>
                <div className='EditEmployee_Footer'>
                    <div className='EditEmployee_Footer_Container'>
                            <button type='button' className='EditEmployee_Footer_Button_Cancel' onClick={() => navigate('/salerno/staff/timeclock')}>
                                Cancel
                            </button>
                            <button type='button' className='EditEmployee_Footer_Button_Save'>
                                Save
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEmployee;