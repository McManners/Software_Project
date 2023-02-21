import React from 'react';
import { useNavigate } from 'react-router-dom';
import './employeelist.css';

const EmployeeList = () => {
    const navigate = useNavigate();
    return (
        <div className="EmployeeList">
            <div className="EmployeeList_Header">
                <div className="EmployeeList_Header_Title">Staff List</div>
                <div className="EmployeeList_Header_AddStaff_Button_Wrapper">
                    <a href="/salerno/employees/new" className='EmployeeList_Header_AddStaff_Button'>
                        Add Staff
                    </a>
                </div>
            </div>
            <div className="EmployeeList_Container">
                <table className="EmployeeList_Table">
                    <thead>
                        <tr>
                            <th style={{width: "25%"}}>Employee Name</th>
                            <th style={{width: "28%"}}>Email Address</th>
                            <th style={{width: "14%"}}>Phone</th>
                            <th style={{width: "11%"}}>BackOffice</th>
                            <th style={{width: "11%"}}>Manager</th>
                            <th style={{width: "11%"}}>Cashier</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr onClick={() => navigate("/salerno/employees/1/edit")}>
                            <td className="EmployeeList_Table_Cell_Left">Anthony Salerno</td>
                            <td className="EmployeeList_Table_Cell_Left">anthony@gmail.com</td>
                            <td className="EmployeeList_Table_Cell_Left">6303622052</td>
                            <td className="EmployeeList_Table_Cell_Centered">X</td>
                            <td className="EmployeeList_Table_Cell_Centered">X</td>
                            <td className="EmployeeList_Table_Cell_Centered">X</td>
                        </tr>
                        <tr>
                            <td className="EmployeeList_Table_Cell_Left">Frankie Salerno</td>
                            <td className="EmployeeList_Table_Cell_Left">frankie@gmail.com</td>
                            <td className="EmployeeList_Table_Cell_Left">6305545627</td>
                            <td className="EmployeeList_Table_Cell_Centered"></td>
                            <td className="EmployeeList_Table_Cell_Centered">X</td>
                            <td className="EmployeeList_Table_Cell_Centered">X</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmployeeList;