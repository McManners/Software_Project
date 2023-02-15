import React, { useState } from 'react';
import './filteritemlist.css';
import { BsSquare } from 'react-icons/bs';
import { FcCheckmark } from 'react-icons/fc';

const FilterItemList = (props) => {
    
    const [filtersOpen, setFiltersOpen] = useState([]);
    const handleFilterButtonClick = event => {
        const type = event.target.value;
        if (filtersOpen === type)
            setFiltersOpen("");
        else
            setFiltersOpen(type);
    }
    
    const filterTypes = ['Price', 'Cost', 'Item', 'Margin', 'Markup', 'Quantity'];
    const ShowHideCheckbox = () => {
        return (
            filterTypes.map(type => (
                <div key={'ShowHideKey_' + type} className='FilterItemList_Checkbox_Wrapper' value={type} onClick={() => props.handleShowHideClick(type)}>
                        {
                            (props.showHideValue.includes(type)) ? 
                            <div className='FilterItemList_Checkbox_Icon_Wrapper'>
                                <BsSquare size='14px' className='FilterItemList_Checkbox_Icon' />
                                <FcCheckmark size='21px' className='FilterItemList_Checkbox_Checked_Icon' />
                            </div> :
                            <div className='FilterItemList_Checkbox_Icon_Wrapper'>
                                <BsSquare size='14px' className='FilterItemList_Checkbox_Icon' />
                            </div>
                        }
                    <div className='FilterItemList_Checkbox_Label'>{type}</div>
                </div>
            )
        ))
    }

    return (
        <div className='FilterItemList' style={props.isFilterOpen ? {width: '300px'} : {width: '0'}}>
            <div className='FilterItemList_Container'>
                <div className='FilterItemList_Type_Wrapper'>
                    <button type='button' className='FilterItemList_Filter_Type_Button' value='Show/Hide' onClick={handleFilterButtonClick}>Show/Hide Column</button>
                    <div className='FilterItemList_Open_Collapsible' style={(filtersOpen === 'Show/Hide') ? {maxHeight: '300px', borderBottom: '1px solid #dddfe1'} : {maxHeight: '0', borderBottom: 'none'}}>
                        <div className='FilterItemList_Checkbox_Dropdown_Container'>    
                            <ShowHideCheckbox />
                        </div>
                    </div>
                </div>
                <div className='FilterItemList_Type_Wrapper'>
                    <button type='button' className='FilterItemList_Filter_Type_Button' value='Price' onClick={handleFilterButtonClick}>Price</button>
                    <div className='FilterItemList_Open_Collapsible' style={(filtersOpen === 'Price') ? {maxHeight: '130px', borderBottom: '1px solid #dddfe1'} : {maxHeight: '0', borderBottom: 'none'}}>
                        <div className='FilterItemList_Open_Wrapper'>
                            <div className='FilterItemList_Select_Wrapper'>
                                <select className='FilterItemList_Filter_Select' value={props.priceValue['Type']} onChange={(event) => props.setPriceValue(prev => ({...prev, 'Type': event.target.value}))}>
                                    <option className='FilterItemList_Filter_Select_Option' value='Equals'>Equals</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Greater'>Greater than</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Greater_Equal'>Greater than or equal to</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Less'>Less than</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Less_Equal'>Less than or equal to</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Range'>In range</option>
                                </select>
                            </div>
                            <div className='FilterItemList_Input_Search_Wrapper'>
                                <input type='text' className='FilterItemList_Input_Search' value={props.priceValue['Value']} onChange={props.handlePriceValueChange} />
                            </div>
                            <div className='FilterItemList_Clear_Wrapper'>
                                <button type='button' className='FilterItemList_Clear_Button' onClick={() => props.setPriceValue({'Value': '', 'Type': 'Equals'})}>Clear filter</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='FilterItemList_Type_Wrapper'>
                    <button type='button' className='FilterItemList_Filter_Type_Button' value='Cost' onClick={handleFilterButtonClick}>Cost</button>
                    <div className='FilterItemList_Open_Collapsible' style={(filtersOpen === 'Cost') ? {maxHeight: '130px', borderBottom: '1px solid #dddfe1'} : {maxHeight: '0', borderBottom: 'none'}}>
                        <div className='FilterItemList_Open_Wrapper'>
                            <div className='FilterItemList_Select_Wrapper'>
                                <select className='FilterItemList_Filter_Select' defaultValue='Equals'>
                                    <option className='FilterItemList_Filter_Select_Option' value='Equals'>Equals</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Greater'>Greater than</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Greater_Equal'>Greater than or equal to</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Less'>Less than</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Less_Equal'>Less than or equal to</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Range'>In range</option>
                                </select>
                            </div>
                            <div className='FilterItemList_Input_Search_Wrapper'>
                                <input type='text' className='FilterItemList_Input_Search' value={props.costValue['Value']} onChange={props.handleCostValueChange} />
                            </div>
                            <div className='FilterItemList_Clear_Wrapper'>
                                <button type='button' className='FilterItemList_Clear_Button'>Clear filter</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='FilterItemList_Type_Wrapper'>
                    <button type='button' className='FilterItemList_Filter_Type_Button' value='Item' onClick={handleFilterButtonClick}>Item</button>
                    <div className='FilterItemList_Open_Collapsible' style={(filtersOpen === 'Item') ? {maxHeight: '55px', borderBottom: '1px solid #dddfe1'} : {maxHeight: '0', borderBottom: 'none'}}>
                        <div className='FilterItemList_Open_Wrapper_Item'>
                            <div className='FilterItemList_Input_Search_Wrapper'>
                                <input type='text' className='FilterItemList_Input_Search' value={props.itemValue} onChange={props.handleItemInput} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='FilterItemList_Type_Wrapper'>
                    <button type='button' className='FilterItemList_Filter_Type_Button' value='Margin' onClick={handleFilterButtonClick}>Margin</button>
                    <div className='FilterItemList_Open_Collapsible' style={(filtersOpen === 'Margin') ? {maxHeight: '130px', borderBottom: '1px solid #dddfe1'} : {maxHeight: '0', borderBottom: 'none'}}>
                        <div className='FilterItemList_Open_Wrapper'>
                            <div className='FilterItemList_Select_Wrapper'>
                                <select className='FilterItemList_Filter_Select' defaultValue='Equals'>
                                    <option className='FilterItemList_Filter_Select_Option' value='Equals'>Equals</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Greater'>Greater than</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Greater_Equal'>Greater than or equal to</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Less'>Less than</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Less_Equal'>Less than or equal to</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Range'>In range</option>
                                </select>
                            </div>
                            <div className='FilterItemList_Input_Search_Wrapper'>
                                <input type='text' className='FilterItemList_Input_Search' value={props.marginValue['Value']} onChange={props.handleMarginValueChange} />
                            </div>
                            <div className='FilterItemList_Clear_Wrapper'>
                                <button type='button' className='FilterItemList_Clear_Button'>Clear filter</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='FilterItemList_Type_Wrapper'>
                    <button type='button' className='FilterItemList_Filter_Type_Button' value='Markup' onClick={handleFilterButtonClick}>Markup</button>
                    <div className='FilterItemList_Open_Collapsible' style={(filtersOpen === 'Markup') ? {maxHeight: '130px', borderBottom: '1px solid #dddfe1'} : {maxHeight: '0', borderBottom: 'none'}}>
                        <div className='FilterItemList_Open_Wrapper'>
                            <div className='FilterItemList_Select_Wrapper'>
                                <select className='FilterItemList_Filter_Select' defaultValue='Equals'>
                                    <option className='FilterItemList_Filter_Select_Option' value='Equals'>Equals</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Greater'>Greater than</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Greater_Equal'>Greater than or equal to</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Less'>Less than</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Less_Equal'>Less than or equal to</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Range'>In range</option>
                                </select>
                            </div>
                            <div className='FilterItemList_Input_Search_Wrapper'>
                                <input type='text' className='FilterItemList_Input_Search' value={props.markupValue['Value']} onChange={props.handleMarkupValueChange} />
                            </div>
                            <div className='FilterItemList_Clear_Wrapper'>
                                <button type='button' className='FilterItemList_Clear_Button'>Clear filter</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='FilterItemList_Type_Wrapper'>
                    <button type='button' className='FilterItemList_Filter_Type_Button' value='Quantity' onClick={handleFilterButtonClick}>Quantity</button>
                    <div className='FilterItemList_Open_Collapsible' style={(filtersOpen === 'Quantity') ? {maxHeight: '130px', borderBottom: '1px solid #dddfe1'} : {maxHeight: '0', borderBottom: 'none'}}>
                        <div className='FilterItemList_Open_Wrapper'>
                            <div className='FilterItemList_Select_Wrapper'>
                                <select className='FilterItemList_Filter_Select' value={props.quantityValue['Type']} onChange={(event) => props.setQuantityValue(prev => ({...prev, 'Type': event.value}))}>
                                    <option className='FilterItemList_Filter_Select_Option' value='Equals'>Equals</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Greater'>Greater than</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Greater_Equal'>Greater than or equal to</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Less'>Less than</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Less_Equal'>Less than or equal to</option>
                                    <option className='FilterItemList_Filter_Select_Option' value='Range'>In range</option>
                                </select>
                            </div>
                            <div className='FilterItemList_Input_Search_Wrapper'>
                                <input type='text' className='FilterItemList_Input_Search' value={props.quantityValue['Value']} onChange={props.handleQuantityValueChange} />
                            </div>
                            <div className='FilterItemList_Clear_Wrapper'>
                                <button type='button' className='FilterItemList_Clear_Button'>Clear filter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterItemList;