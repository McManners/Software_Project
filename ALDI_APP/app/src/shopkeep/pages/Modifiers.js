import React, { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Modifiers.css';

import { IconContext } from "react-icons/lib";
import { BsPlusSquareFill } from 'react-icons/bs';
import { RiDeleteBinFill } from 'react-icons/ri';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';

import ButtonTabs from "../components/ButtonTabs";
import { useParams } from "react-router-dom";
import FilterButton from "../container/FilterButton";

const stock_items = require('../data/stock_items.json');

var json = 
        { 'group-name': 'g1', 'groups': [
            { 'id': 0, 'data': { 'name': 'New Option', 'price': 0 }},
            { 'id': 1, 'data': { 'name': 'New Option 1', 'price': 1 }}
        ]
    }


export default function Modifiers() {
    var j = 
        { 'group-name': 'g1', 'options': [
            { 'name': 'name1', 'price': 0 },
            { 'name': 'name1', 'price': 0 }
        ]
    }

    const [modifiers, setModifiers] = useState(
        {
            "Groups":
                [
                    {
                        "ID": 1,
                        "Name": "Gravy",
                        "Options": [
                            {
                                "ID": 1,
                                "Name": "Dry",
                                "Price": 0
                            },
                            {
                                "ID": 2,
                                "Name": "Wet",
                                "Price": 0
                            },
                            {
                                "ID": 3,
                                "Name": "Soaked",
                                "Price": 0
                            }
                        ]
                    },
                    {
                        "ID": 2,
                        "Name": "Group 2",
                        "Options": [
                            {
                                "ID": 4,
                                "Name": "Name 1",
                                "Price": 10
                            }
                        ]
                    }
                ],
            "Add Ons":
                [
                    {
                        "ID": 1,
                        "Name": "Mozzarella",
                        "Price": 1.5
                    },
                    {
                        "ID": 2,
                        "Name": "Cheddar",
                        "Price": 1.5
                    },
                    {
                        "ID": 3,
                        "Name": "Sweet Peppers",
                        "Price": 1.25
                    },
                    {
                        "ID": 4,
                        "Name": "Hot Peppers",
                        "Price": 1.25
                    }
                ],
            "No Options":
                [
                    {
                        "ID": 1,
                        "Name": "Mozzarella",
                        "Price": 1.5
                    },
                    {
                        "ID": 2,
                        "Name": "Cheddar",
                        "Price": 1.5
                    },
                    {
                        "ID": 3,
                        "Name": "Sweet Peppers",
                        "Price": 1.25
                    },
                    {
                        "ID": 4,
                        "Name": "Hot Peppers",
                        "Price": 1.25
                    }
                ]
        }
    );


    const { uuid } = useParams();
    const [item, setItem] = useState({});

    useEffect(() => {
        console.log('useeffecting')
        if (uuid !== undefined) {
            stock_items.forEach(item => {
                if (item['Item UUID'] === uuid)
                    setItem(item);
            });
        }
        console.log('done useeffecting')
    }, [])

    const [group, setGroup] = useState(j);
    function updateGroupName(n) {
        let copy = Object.assign({}, group);
        copy["group-name"] = n;
        setGroup(copy);
    }
    function addGroupOption() {
        let copy = Object.assign({}, group);
        copy.options = [...{'name': `New Option ${copy.options.length + 1}`, 'price': 0}]
        setGroup(copy);
    }
    function removeGroupOption(v) {
        let copy = Object.assign({}, group);
        copy.options = copy.options.filter(e => e !== copy.options[v.target.attributes.rowid.value]);
        setGroup(copy);
    }
    function setGroupOptionName(v) {
        let copy = Object.assign({}, group);
        let index = v.target.attributes.optionindex.value;
        copy.options[index].name = v.target.value;
        setGroup(copy);
    }
    function setGroupOptionPrice(v) {
        let copy = Object.assign({}, group);
        let index = v.target.attributes.optionindex.value;
        copy.options[index].price = v.target.value;
        setGroup(copy);
    }


    const [groupName, setGroupName] = useState(json['group-name']);
    function ChangeGroupName(name) {
        setGroupName(name.target.value);
    }
    const [groupOptions, setGroupOptions] = useState(json['groups']);
    const AddGroupOption = () => {
        const newOption = { 'id': groupOptions.length, 'data': { 'name': `New Option ${groupOptions.length}`, 'price': 0 }};
        setGroupOptions([...groupOptions, newOption]);
    }
    function RemoveGroupOption(v) {
        console.log(groupOptions);
        var g = groupOptions.filter(e => e !== groupOptions[v.target.attributes.rowid.value] );
        console.log(g);
        setGroupOptions(g, () => console.log(groupOptions));
    }
    function SetGroupOptionName(v) {
        var index = v.target.attributes.optionindex.value;
        var n = groupOptions;
        console.log(n);
        console.log(n[index])
        n[index].data.name = v.target.value;
        console.log(n[index])
        setGroupOptions(n);
    }
    function check() {
        console.log(groupOptions);
    }
    function SetGroupOptionPrice(v) {
        var index = v.target.attributes.optionindex.value;
        var n = groupOptions;
        console.log(n);
        console.log(n[index])
        n[index].data.price = v.target.value;
        console.log(n[index])
        setGroupOptions(n);
    }

    const handleAddGroup = () => {
        let temp = Object.assign({}, modifiers);
        temp['Groups'].push(
            {
                "Name": "New Group",
                "Options": []
            }
        )
        setModifiers(temp);
    }
    const handleAddGroupOption = (group) => {
        console.log(group)
        console.log('adding group option to: ' + group['Name'])
        let temp = Object.assign({}, modifiers);
        temp['Groups'].find(g => g['Name'] === group['Name'])['Options'].push({ "Name": "New Option", "Price": 0.00 });
        setModifiers(temp);
    }
    const handleRemoveGroupOption = (group, option) => {
        console.log('removing group option for group name: ' + group['Name']);
        console.log('removing option name: ' + option['Name']);
        let groupNameToRemove = group['Name'];
        let optionNameToRemove = option['Name'];
        let temp = Object.assign({}, modifiers);
        let targetGroup = temp['Groups'].find(group => group['Name'] === groupNameToRemove)
        let targetOption = targetGroup['Options'].filter(option => option['Name'] !== optionNameToRemove);
        temp['Groups'].find(group => group['Name'] === targetGroup['Name'])['Options'] = targetOption;
        setModifiers(temp);
    }
    const handleRemoveGroup = (groupInput) => {
        console.log('removing group by name: ' + group['Name']);
        let temp = Object.assign({}, modifiers);
        let newGroups = temp['Groups'].filter(group => group['Name'] !== groupInput['Name']);
        temp['Groups'] = newGroups;
        setModifiers(temp);
    }
    const handleRemoveAddOn = (addOnInput) => {
        let temp = Object.assign({}, modifiers);
        let newAddons = temp['Add Ons'].filter(addOn => addOn['Name'] !== addOnInput['Name']);
        temp['Add Ons'] = newAddons;
        setModifiers(temp);
    }
    const handleRemoveNoOption = (noOptionInput) => {
        let temp = Object.assign({}, modifiers);
        let newNoOptions = temp['No Options'].filter(noOption => noOption['Name'] !== noOptionInput['Name']);
        temp['No Options'] = newNoOptions;
        setModifiers(temp);
    }

    const handleAddAddOn = () => {
        let temp = Object.assign({}, modifiers);
        temp['Add Ons'].push({ "Name": "New Option", "Price": 0.00 });
        setModifiers(temp);
    }
    const handleAddNoOption = () => {
        console.log('x')
        let temp = Object.assign({}, modifiers);
        temp['No Options'].push({ "Name": "New Option", "Price": 0.00 });
        setModifiers(temp);
    }

    const [copyGroupSelect, setCopyGroupSelect] = useState('Copy/Import from another item');
    const [copyGroupDropdownOpen, setCopyGroupDropdownOpen] = useState(false);

    const testRef = useRef();

    const handleCopyGroupModififerClick = (selected) => {
        setCopyGroupSelect(selected);
        setCopyGroupDropdownOpen(false);
    }
    
    const copyInputRef = useRef();
    const CopyModifierGroupsDropdown = () => {
        return (
            <div className='Modifiers_Groups_Copy_Import_Dropdown_Container' onClick={e => e.stopPropagation()} ref={testRef}>
                <div className='Modifiers_Groups_Copy_Import_Dropdown_Page_Wrapper'></div>
                <div className={copyGroupDropdownOpen ? 
                        'Modifiers_Groups_Copy_Import_Select_Dropdown' : 
                        'hide Modifiers_Groups_Copy_Import_Select_Dropdown' 
                    }>
                    <div className='Modifiers_Groups_Copy_Import_Select_Dropdown_Search_Wrapper'>
                        <input type='text' ref={copyInputRef} className='Modifiers_Groups_Copy_Import_Select_Dropdown_Search' autoComplete="off" />
                    </div>
                    <div className='Modifiers_Groups_Copy_Import_Select_Dropdown_Scroll_Container'>
                        <ul className='Modifiers_Groups_Copy_Import_Select_Dropdown_List'>
                            <li className='Modifiers_Groups_Copy_Import_Select_Dropdown_List_Item' onClick={() => handleCopyGroupModififerClick('Item 1')}>Item 1</li>
                            <li className='Modifiers_Groups_Copy_Import_Select_Dropdown_List_Item' onClick={() => handleCopyGroupModififerClick('Item 2')}>Item 2</li>
                            <li className='Modifiers_Groups_Copy_Import_Select_Dropdown_List_Item' onClick={() => handleCopyGroupModififerClick('Item 3')}>Item 3</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    const GroupContent = () => {
        if (modifiers['Groups'].length === 0) {
            return (
                <div className='Modifiers_Groups_Empty_Container'>
                    <ul className='Modifiers_Groups_Empty_List'>
                        <li className='Modifiers_Groups_Empty_List_Item'>Group modifiers allow you to select one option from a list</li>
                        <li className='Modifiers_Groups_Empty_List_Item'>The base option is activated by default and included in the base price</li>
                    </ul>
                    <div className='Modifiers_Groups_Empty_Example_Container'>
                        <div className='Modifiers_Groups_Empty_Example'>Example: Small, Medium, or Large</div>
                        
                        <button type='button' className='Modifiers_Add_Option_Button_First' onClick={handleAddGroup}>
                            <IconContext.Provider value={{ style: { verticalAlign: 'middle' },  size: '1.25em' }}>
                                <BsPlusSquareFill className='Modifiers_Button_Icon Modifiers_Button_Icon_Empty_Green' />
                            </IconContext.Provider>
                            Add a group
                        </button>
                    </div>
                </div>
            )
        } else
        return (
            <div>
                {
                modifiers['Groups'].map((group, index) => {
                    return (
                        <div key={group + index}>
                            <div className='Modifiers_Group_Container'>
                                <div className='Modifiers_Group_Name_Container'>
                                    <span className='Modifiers_Group_Name_Label'>Group Name</span>
                                    <input type='text' className='Modifiers_Group_Name_Input' defaultValue={group['Name']}/>
                                    <button type='button' className='Modifiers_Delete_Button' onClick={() => handleRemoveGroup(group)}>
                                        <IconContext.Provider value={{ style: { verticalAlign: 'top' },  size: '1.25em' }}>
                                            <RiDeleteBinFill />
                                        </IconContext.Provider>
                                        Delete
                                    </button>
                                </div>
                                <div className='Modifiers_Group_List_Container'>
                                    <div className='Modifiers_Group_List_Header'>
                                        <span className='Modifiers_Group_List_Header_Name'>Option name</span>
                                        <span className='Modifiers_Group_List_Header_Add_Price'>Add to price</span>
                                        <span className='Modifiers_Group_List_Header_Base'>Base</span>
                                    </div>
                                    
                                    <ul className='Modifiers_Group_List'>
                                    {
                                        group['Options'].map((option, index) => (
                                                <li key={option + index}>
                                                    <input type='text' className='Modifiers_Option_Name_Input' defaultValue={option['Name']} onChange={SetGroupOptionName} />
                                                    <input type='text' className='Modifiers_Option_Price_Input' defaultValue={option['Price']} />
                                                    <button type='button' className='Modifiers_Delete_Button' onClick={() => handleRemoveGroupOption(group, option)}>
                                                        <IconContext.Provider value={{ style: { verticalAlign: 'top' },  size: '1.5em' }}>
                                                            <RiDeleteBinFill />
                                                        </IconContext.Provider>
                                                </button>
                                            </li>
                                            )
                                        )
                                    }
                                        <li>
                                            <button type='button' className='Modifiers_Add_Option_Button' onClick={() => handleAddGroupOption(group)}>
                                                <IconContext.Provider value={{ style: { verticalAlign: 'middle' },  size: '1.25em' }}>
                                                    <BsPlusSquareFill className='Modifiers_Button_Icon Modifiers_Button_Icon_Empty_Green' />
                                                </IconContext.Provider>
                                                Add another option
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                                }
                )}
                <div className='Modifiers_Group_Footer'>
                    <button type='button' className='Modifiers_Add_Option_Button' onClick={handleAddGroup}>
                        <IconContext.Provider value={{ style: { verticalAlign: 'middle' },  size: '1.25em' }}>
                            <BsPlusSquareFill className='Modifiers_Button_Icon Modifiers_Button_Icon_Empty_Green' />
                        </IconContext.Provider>
                        Add another group
                    </button>
                </div>
            </div>
            )
        }
        
    const NoOptions = () => {
        if (modifiers['No Options'].length === 0) {
            return (
                <div className='Modifiers_Groups_Empty_Container'>
                    <ul className='Modifiers_Groups_Empty_List'>
                        <li className='Modifiers_Groups_Empty_List_Item'>"NO" Options are activated by default and do not print on receipts</li>
                        <li className='Modifiers_Groups_Empty_List_Item'>If pressed, they will deactivate and print "No option name" on all receipts</li>
                    </ul>
                    <div className='Modifiers_Groups_Empty_Example_Container'>
                        <div className='Modifiers_Groups_Empty_Example'>Example: Cheeseburger, No bun</div>
                        
                        <button type='button' className='Modifiers_Add_Option_Button_First' onClick={handleAddNoOption}>
                            <IconContext.Provider value={{ style: { verticalAlign: 'middle' },  size: '1.25em' }}>
                                <BsPlusSquareFill className='Modifiers_Button_Icon Modifiers_Button_Icon_Empty_Green' />
                            </IconContext.Provider>
                            Add an option
                        </button>
                    </div>
                </div>
            )
        } else
        return (
            <div className='Modifiers_NoOptions_Container'>
                <div className='Modifiers_NoOptions_List_Container'>
                    <div className='Modifiers_NoOptions_List_Header'>
                        <span className='Modifiers_NoOptions_List_Header_Name'>Option name</span>
                        <span className='Modifiers_NoOptions_List_Header_Add_Price'>Discount when OFF</span>
                    </div>
                    <ul className='Modifiers_NoOptions_List'>
                        {
                            modifiers['No Options'].map((noOption, index) => (
                                <li key={noOption + index}>
                                    <input type='text' className='Modifiers_Option_Name_Input' defaultValue= {noOption['Name']} onChange={SetGroupOptionName} />
                                    <input type='text' className='Modifiers_Option_Price_Input' defaultValue={noOption['Price']} />
                                    <button type='button' className='Modifiers_Delete_Button' onClick={() => handleRemoveNoOption(noOption)}>
                                        <IconContext.Provider value={{ style: { verticalAlign: 'top' },  size: '1.5em' }}>
                                            <RiDeleteBinFill />
                                        </IconContext.Provider>
                                    </button>
                                </li>
                            ))
                        }
                        <li>
                            <button type='button' className='Modifiers_Add_Option_Button' onClick={handleAddNoOption}>
                                <IconContext.Provider value={{ style: { verticalAlign: 'middle' },  size: '1.25em' }}>
                                    <BsPlusSquareFill className='Modifiers_Button_Icon Modifiers_Button_Icon_Empty_Green' />
                                </IconContext.Provider>
                                Add another option
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            
        )
    }
    const handleOpenDropdown = () => {
        console.log('hey')
        setCopyGroupDropdownOpen(true);

    }
    useEffect(() => {
        copyInputRef.current.focus();
      }, [copyGroupDropdownOpen === false]);
    const AddOns = () => {
        if (modifiers['Add Ons'].length === 0) {
            return (
                <div className='Modifiers_Groups_Empty_Container'>
                    <ul className='Modifiers_Groups_Empty_List'>
                        <li className='Modifiers_Groups_Empty_List_Item'>Add-on Options will print on all receipts when activated</li>
                        <li className='Modifiers_Groups_Empty_List_Item'>If activated, option price will be added to base price</li>
                    </ul>
                    <div className='Modifiers_Groups_Empty_Example_Container'>
                        <div className='Modifiers_Groups_Empty_Example'>Example: Extra Cheese (add 0.50 to price)</div>
                        
                        <button type='button' className='Modifiers_Add_Option_Button_First' onClick={handleAddAddOn}>
                            <IconContext.Provider value={{ style: { verticalAlign: 'middle' },  size: '1.25em' }}>
                                <BsPlusSquareFill className='Modifiers_Button_Icon Modifiers_Button_Icon_Empty_Green' />
                            </IconContext.Provider>
                            Add an add-on
                        </button>
                    </div>
                </div>
            )
        } else
        return (
            <div className='Modifiers_AddOn_Container'>
                <div className='Modifiers_AddOn_List_Container'>
                    <div className='Modifiers_AddOn_List_Header'>
                        <span className='Modifiers_AddOn_List_Header_Name'>Option name</span>
                        <span className='Modifiers_AddOn_List_Header_Add_Price'>Add to price</span>
                    </div>
                    <ul className='Modifiers_AddOn_List'>
                        {
                            modifiers['Add Ons'].map((addOn, index) => (
                                <li key={addOn + index}>
                                    <input type='text' className='Modifiers_Option_Name_Input' defaultValue= {addOn['Name']} onChange={SetGroupOptionName} />
                                    <input type='text' className='Modifiers_Option_Price_Input' defaultValue={addOn['Price']} />
                                    <button type='button' className='Modifiers_Delete_Button' onClick={() => handleRemoveAddOn(addOn)}>
                                        <IconContext.Provider value={{ style: { verticalAlign: 'top' },  size: '1.5em' }}>
                                            <RiDeleteBinFill />
                                        </IconContext.Provider>
                                    </button>
                                </li>
                            ))
                        }
                        <li>
                            <button type='button' className='Modifiers_Add_Option_Button' onClick={handleAddAddOn}>
                                <IconContext.Provider value={{ style: { verticalAlign: 'middle' },  size: '1.25em' }}>
                                    <BsPlusSquareFill className='Modifiers_Button_Icon Modifiers_Button_Icon_Empty_Green' />
                                </IconContext.Provider>
                                Add another option
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className='Modifiers'>
            <div className='PageLayout_Header'>
                <div className='PageLayout_Header_Title'>Edit Item</div>
                <div className='PageLayout_Header_Button_Container'>
                    <FilterButton />
                </div>
            </div>
            <div className='Modifiers_Container'>
                <ButtonTabs />
                <div className='Modifiers_Content_Border_Fix'>    
                    <div className='Modifiers_Content'>    
                        <div className='Modifiers_Item_Name_Container' id='item-name-row'>
                            <div className='Modifiers_Item_Name'>{item['Name']}</div>
                        </div>
                        <div className='Modifiers_Grid'>
                            <div className='Modifiers_Base_Sale_Header'>
                                    <div className='Modififers_Base_Sale_Container'>
                                        <span className='Modififers_Base_Sale_Label'>
                                            <b>Base Sales Price</b>
                                        </span>
                                        <span className='Modififers_Base_Sale_Value'>0.00</span>
                                    </div>
                                    <div className='Modifiers_Show_Checkbox_Container'>
                                        <input type='checkbox' className='Modifiers_Show_Checkbox' id='Modifiers_Show_Checkbox'/>
                                        <label htmlFor='Modifiers_Show_Checkbox' className='Modifiers_Show_Checkbox_Label'>Show modifiers when I sell this item</label>
                                    </div>
                            </div>
                        
                            <div className='Modifiers_Groups_Header_Container'>
                                    <span className='Modifiers_Groups_Header_Label'>
                                        <b>Groups - Single Choice</b>
                                    </span>
                                        {
                                            copyGroupDropdownOpen ? 
                                            <button 
                                                className='Modifiers_Groups_Copy_Import_Select_Dropdown_Selected Modifiers_Groups_Copy_Import_Select_Dropdown_Selected_Is_Open' onClick={() => setCopyGroupDropdownOpen(false)}>
                                                        {copyGroupSelect}
                                                        <IconContext.Provider value={{ style: { verticalAlign: 'middle', height: '100%', float: 'right', color: 'rgb(139, 139, 139)' }, size: '1.25em' }}>
                                                            {
                                                                (copyGroupDropdownOpen ? 
                                                                    <TiArrowSortedUp className='Modifiers_Groups_Copy_Import_Arrow' /> : 
                                                                    <TiArrowSortedDown className='Modifiers_Groups_Copy_Import_Arrow' />
                                                                )
                                                            }
                                                        </IconContext.Provider>
                                            </button> : 
                                            <button 
                                                className='Modifiers_Groups_Copy_Import_Select_Dropdown_Selected' onClick={handleOpenDropdown}>
                                                        {copyGroupSelect}
                                                        <IconContext.Provider value={{ style: { verticalAlign: 'middle', height: '100%', float: 'right', color: 'rgb(139, 139, 139)' }, size: '1.25em' }}>
                                                            {
                                                                (copyGroupDropdownOpen ? 
                                                                    <TiArrowSortedUp className='Modifiers_Groups_Copy_Import_Arrow' /> : 
                                                                    <TiArrowSortedDown className='Modifiers_Groups_Copy_Import_Arrow' />
                                                                )
                                                            }
                                                        </IconContext.Provider>
                                            </button>
                                        }
                                    <CopyModifierGroupsDropdown />
                                    {/* <span className='Modifiers_Groups_Copy_Import_Select_Container'>
                                        <select id='group-copy-import-input' defaultValue='0' className='Modifiers_Groups_Copy_Import_Select'>
                                            <option value="0" disabled hidden>Copy / Import from another item</option>
                                        </select>
                                    </span> */}
                            </div>
                            <div className='Modififers_Groups_Wrapper'>
                                <GroupContent />
                            </div>
                            <div className='Modifiers_Groups_Header_Container'>
                                    <span className='Modifiers_Groups_Header_Label'>
                                        <b>Options - Multiple Choice</b>
                                    </span>
                                    <span className='Modifiers_Groups_Copy_Import_Select_Container'>
                                        <select id='group-copy-import-input' defaultValue='0' className='Modifiers_Groups_Copy_Import_Select'>
                                            <option value="0" disabled hidden>Copy / Import from another item</option>
                                        </select>
                                    </span>
                            </div>
                            <div className='Modififers_AddOns_Wrapper'>
                                <div className='Modifiers_AddOns_Header'><b>Add-ons</b></div>
                                <AddOns />
                            </div>
                            <div className='Modififers_NoOptions_Wrapper'>
                                <div className='Modifiers_NoOptions_Header'><b>"NO" Options</b></div>
                                <NoOptions />
                                <div className='Modifiers_Submit_Container'>
                                    <button type='button' className='Modifiers_Submit_Button'>Ok</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}