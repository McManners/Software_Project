import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddNewItemDialog from '../components/AddNewItem';
import FilterItemList from '../components/FilterItemList';
import '../css/itemlist.css';
import FilterButton from '../components/FilterButton';
import { HiFilter } from 'react-icons/hi';
import { AiOutlineVerticalLeft, AiOutlineLeft, AiOutlineRight, AiOutlineVerticalRight} from 'react-icons/ai';

let items = require('../data/stock_items.json');

const ItemList = () => {
    const navigate = useNavigate();
    const [addNewItemOpen, setAddNewItemOpen] = useState(false);
    const [addBasicItemOpen, setAddBasicItemOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    
    const [showHideValue, setShowHideValue] = useState(['Item', 'Margin', 'Markup', 'Quantity', 'Total Value']);
    const [priceValue, setPriceValue] = useState('');
    const [costValue, setCostValue] = useState('');
    const [itemValue, setItemValue] = useState('');
    const [marginValue, setMarginValue] = useState('');
    const [markupValue, setMarkupValue] = useState('');
    const [quantityValue, setQuantityValue] = useState('');

    const handleShowHideClick = (type) => {
        if (showHideValue.includes(type)) {
            console.log('removing: ' + type)
            setShowHideValue(prev => prev.filter(val => val !== type));
        } else {
            console.log('adding: ' + type)
            setShowHideValue(prev => [...prev, type]);
        }
    }
    const handlePriceInput = event => {
        event.preventDefault();
        console.log(event.target.value)
        console.log(priceValue)
        const x = event.target.value;
        if (event.target.value.length === priceValue.length - 1) {
            setPriceValue(event.target.value)
        } else if ((!isNaN(event.target.value.charAt(event.target.value.length - 1)) 
                || (event.target.value.charAt(event.target.value.length - 1) === "." && event.target.value.substring(0, event.target.value.length - 1).indexOf('.') < 0) 
                || (event.target.value.charAt(event.target.value.length - 1) === "-" && event.target.value.length === 1)) 
                    && event.target.value.charAt(event.target.value.length - 1) !== " ")
            setPriceValue(event.target.value);

            // WOW!
    }
    const handleCostInput = event => {
        event.preventDefault();
        if (event.target.value.length === costValue.length - 1) {
            setCostValue(event.target.value)
        } else if ((!isNaN(event.target.value.charAt(event.target.value.length - 1)) 
                || (event.target.value.charAt(event.target.value.length - 1) === "." && event.target.value.substring(0, event.target.value.length - 1).indexOf('.') < 0) 
                || (event.target.value.charAt(event.target.value.length - 1) === "-" && event.target.value.length === 1)) 
                    && event.target.value.charAt(event.target.value.length - 1) !== " ")
            setCostValue(event.target.value);
    }
    const handleItemInput = event => {
        event.preventDefault();
        setItemValue(event.target.value);
    }
    const handleMarginInput = event => {
        event.preventDefault();
        if (isNaN(event.target.value.charAt(event.target.value.length - 1))) return;
        if (event.target.value.length === marginValue.length - 1) {
            setMarginValue(event.target.value)
        } else if ((!isNaN(event.target.value.charAt(event.target.value.length - 1)) 
                || (event.target.value.charAt(event.target.value.length - 1) === "." && event.target.value.substring(0, event.target.value.length - 1).indexOf('.') < 0) 
                || (event.target.value.charAt(event.target.value.length - 1) === "-" && event.target.value.length === 1)) 
                    && event.target.value.charAt(event.target.value.length - 1) !== " ")
                    setMarginValue(event.target.value);
    }
    const handleMarkupInput = event => {
        event.preventDefault();
        if (event.target.value.length === markupValue.length - 1) {
            setMarkupValue(event.target.value)
        } else if ((!isNaN(event.target.value.charAt(event.target.value.length - 1)) 
                || (event.target.value.charAt(event.target.value.length - 1) === "." && event.target.value.substring(0, event.target.value.length - 1).indexOf('.') < 0) 
                || (event.target.value.charAt(event.target.value.length - 1) === "-" && event.target.value.length === 1)) 
                    && event.target.value.charAt(event.target.value.length - 1) !== " ")
            setMarkupValue(event.target.value);
    }
    const handleQuantityInput = event => {
        event.preventDefault();
        if (event.target.value.length === quantityValue.length - 1) {
            setQuantityValue(event.target.value)
        } else if ((!isNaN(event.target.value.charAt(event.target.value.length - 1)) 
                || (event.target.value.charAt(event.target.value.length - 1) === "." && event.target.value.substring(0, event.target.value.length - 1).indexOf('.') < 0) 
                || (event.target.value.charAt(event.target.value.length - 1) === "-" && event.target.value.length === 1)) 
                    && event.target.value.charAt(event.target.value.length - 1) !== " ")
            setQuantityValue(event.target.value);
    }






    const DataRows = () => {
        return (
            <tbody>
                {
                    items.map(item => {
                        return (
                            <tr key={item['Item UUID']}>
                                <td className='ItemList_Table_Content_Body_Cell' style={(showHideValue.includes('Price')) ? {display: 'table-cell'} : {display: 'none'}}>
                                    <div className='ItemList_Table_Body_Data_Container'>
                                        <span className='ItemList_ItemDetails'>{item['Price'].toFixed(2 )}</span>
                                    </div>
                                </td>
                                <td className='ItemList_Table_Content_Body_Cell' style={(showHideValue.includes('Cost')) ? {display: 'table-cell'} : {display: 'none'}}>
                                    <div className='ItemList_Table_Body_Data_Container'>
                                        <span className='ItemList_ItemDetails'>{item['Price'].toFixed(2 )}</span>
                                    </div>
                                </td>
                                <td className='ItemList_Table_Content_Body_Cell_Item_Col' style={(showHideValue.includes('Item')) ? {display: 'table-cell'} : {display: 'none'}}>
                                    <div className='ItemList_Table_Body_Data_Container'>
                                        <button className='ItemList_ItemName_Button' onClick={() => navigate(`/salerno/edit/${item['Item UUID']}`)}>{item['Name']}</button>
                                    </div>
                                </td>
                                <td className='ItemList_Table_Content_Body_Cell' style={(showHideValue.includes('Margin')) ? {display: 'table-cell'} : {display: 'none'}}>
                                    <div className='ItemList_Table_Body_Data_Container'>
                                        <span className='ItemList_ItemDetails'>{(((item['Price'] - item['Assigned Cost']) / item['Price'].toFixed(2)) * 100).toFixed(2)}%</span>
                                    </div>
                                </td>
                                <td className='ItemList_Table_Content_Body_Cell' style={(showHideValue.includes('Markup')) ? {display: 'table-cell'} : {display: 'none'}}>
                                    <div className='ItemList_Table_Body_Data_Container'>
                                        <span className='ItemList_ItemDetails'>{((item['Price'] / item['Assigned Cost']) * 100).toFixed(2)}%</span>
                                    </div>
                                </td>
                                <td className='ItemList_Table_Content_Body_Cell' style={(showHideValue.includes('Quantity')) ? {display: 'table-cell'} : {display: 'none'}}>
                                    <div className='ItemList_Table_Body_Data_Container'>
                                        <span className='ItemList_ItemDetails'>{item['Quantity']}</span>
                                    </div>
                                </td>
                                <td className='ItemList_Table_Content_Body_Cell' style={(showHideValue.includes('Total Value')) ? {display: 'table-cell'} : {display: 'none'}}>
                                    <div className='ItemList_Table_Body_Data_Container'>
                                        <span className='ItemList_ItemDetails'></span>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        )
    }

    return (
        <div className='ItemList'>
            <div className='PageLayout_Header'>
                <div className='PageLayout_Header_Title'>Item List</div>
                <div className='PageLayout_Header_Button_Container'>
                    <button className='ItemList_Header_AddNewItem_Button' onClick={() => setDialogOpen(true)}>
                        <div className='ItemList_Header_AddNewItem_Text'>Add New</div>
                    </button>
                    <FilterButton handleClick={setIsFilterOpen} />
                </div>
            </div>
            <AddNewItemDialog setAddNewItemOpen={setAddNewItemOpen} addNewItemOpen={addNewItemOpen} addBasicItemOpen={addBasicItemOpen} setAddBasicItemOpen={setAddBasicItemOpen} setDialogOpen={setDialogOpen} dialogOpen={dialogOpen} />
            <div className='ItemList_Container'>
                <FilterItemList isFilterOpen={isFilterOpen} 
                    showHideValue={showHideValue} handleShowHideClick={handleShowHideClick} 
                    priceValue={priceValue} handlePriceInput={handlePriceInput} 
                    costValue={costValue} handleCostInput={handleCostInput} 
                    itemValue={itemValue} handleItemInput={handleItemInput} 
                    marginValue={marginValue} handleMarginInput={handleMarginInput} 
                    markupValue={markupValue} handleMarkupInput={handleMarkupInput} 
                    quantityValue={quantityValue} handleQuantityInput={handleQuantityInput} 
                    />
                    <div className='ItemList_Test'>
                <div className='ItemList_Header_Container'>
                    <div className='ItemList_Header_Control_Buttons'>
                        <button type='button' className='ItemList_Header_Button ItemList_Header_Button_BulkAction_Dropdown'>
                            Bulk action 
                        </button>
                        <button type='button' disabled className='ItemList_Header_Button_Disabled ItemList_Header_Button ItemList_Header_Button_ExpandAll'>
                            Expand all
                        </button>
                        <button type='button' disabled className='ItemList_Header_Button_Disabled ItemList_Header_Button ItemList_Header_Button_CollapseAll'>
                            Collapse all
                        </button>
                        <button type='button' className='ItemList_Header_Button ItemList_Header_Button_Export_CSV'>
                            Export to CSV
                        </button>
                        <button type='button' className='ItemList_Header_Button ItemList_Header_Button_Export_Excel'>
                            Export to Excel
                        </button>
                    </div>
                </div>
                
                <div className='ItemList_Table_Container_Scroll'>
                        <div className='ItemList_Table_Container'>
                            <table className='ItemList_Table'>
                                <thead>
                                    <tr>
                                        <td className='ItemList_Table_Header_Col' style={(showHideValue.includes('Price')) ? {display: 'table-cell'} : {display: 'none'}}>
                                            <div className='ItemList_Table_Header_Title'>
                                                <div className='ItemList_Table_Header_Title_Not_Item'>Price</div>
                                                <input type='text' className='ItemList_Table_Header_Input' />
                                            </div>
                                        </td>
                                        <td className='ItemList_Table_Header_Col' style={(showHideValue.includes('Cost')) ? {display: 'table-cell'} : {display: 'none'}}>
                                            <div className='ItemList_Table_Header_Title'>
                                                <div className='ItemList_Table_Header_Title_Not_Item'>Cost</div>
                                                <input type='text' className='ItemList_Table_Header_Input' />
                                            </div>
                                        </td>
                                        <td className='ItemList_Table_Header_Item_Col' style={(showHideValue.includes('Item')) ? {display: 'table-cell'} : {display: 'none'}}>
                                            <div className='ItemList_Table_Header_Title'>
                                                <div className='ItemList_Table_Header_Title_Item'>Item</div>
                                                <input type='text' value={itemValue} onChange={handleItemInput} className='ItemList_Table_Header_Input' />
                                            </div>
                                        </td>
                                        <td className='ItemList_Table_Header_Col' style={(showHideValue.includes('Margin')) ? {display: 'table-cell'} : {display: 'none'}}>
                                            <div className='ItemList_Table_Header_Title'>
                                                <div className='ItemList_Table_Header_Title_Not_Item'>Margin</div>
                                                <input type='text' value={marginValue} onChange={handleMarginInput} className='ItemList_Table_Header_Input' />
                                            </div>
                                        </td>
                                        <td className='ItemList_Table_Header_Col' style={(showHideValue.includes('Markup')) ? {display: 'table-cell'} : {display: 'none'}}>
                                            <div className='ItemList_Table_Header_Title'>
                                                <div className='ItemList_Table_Header_Title_Not_Item'>Markup</div>
                                                <div className='ItemList_Table_Header_Search_Wrapper'>
                                                    <input type='text' value={markupValue} onChange={handleMarkupInput} className='ItemList_Table_Header_Input' />
                                                    <button className='ItemList_Table_Header_Search_Filter_Button'>
                                                        <HiFilter className='ItemList_Filter_Icon' size='1.5em' />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='ItemList_Table_Header_Col'>
                                            <div className='ItemList_Table_Header_Title'>
                                                <div className='ItemList_Table_Header_Title_Not_Item'>Quantity</div>
                                                <input type='text' value={quantityValue} onChange={handleQuantityInput} className='ItemList_Table_Header_Input' />
                                            </div>
                                        </td>
                                        <td className='ItemList_Table_Header_Col'>
                                            <div className='ItemList_Table_Header_Title'>
                                                <div className='ItemList_Table_Header_Title_Not_Item'>Total Value</div>
                                                <input type='text' disabled className='ItemList_Table_Header_Input' />
                                            </div>
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className='xtest'>
                            <table className='ItemList_Table_Content'>
                                
                                <DataRows />
                            </table>
                        </div>
                    </div>
                </div>
                <div className='ItemList_Table_PageOptions'>
                    <div className='ItemList_Table_PageOptions_Container'>
                        <span className='ItemList_Table_PageOptions_Title'>Page size</span>
                        <button type='button' className='ItemList_Table_PageOptions_Button'>50</button>
                        <button type='button' className='ItemList_Table_PageOptions_Button'>100</button>
                        <button type='button' className='ItemList_Table_PageOptions_Button'>150</button>
                        <button type='button' className='ItemList_Table_PageOptions_Button ItemList_Table_PageOptions_Button--selected'>All</button>
                        <span className='ItemList_PageOptions_Page_Buttons_Container'>
                            <span className='ItemList_Table_PageOptions_Summary'>1 to 83 of 83</span>
                            <button type='button' className='ItemList_PageOptions_Page_Button_Disabled'>
                                <AiOutlineVerticalRight size='0.8em'/>
                            </button>
                            <button type='button' className='ItemList_PageOptions_Page_Button_Disabled'>
                                <AiOutlineLeft size='0.8em'/>
                            </button>
                            <span className='ItemList_PageOptions_CurrentPage'>
                                Page <span style={{margin: '0 7px'}}>1</span> of <span style={{margin: '0 7px 0 0'}}>2</span>
                            </span>
                            <button type='button' className='ItemList_PageOptions_Page_Button'>
                                <AiOutlineRight size='0.8em'/>
                            </button>
                            <button type='button' className='ItemList_PageOptions_Page_Button'>
                                <AiOutlineVerticalLeft size='0.8em' />
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemList;