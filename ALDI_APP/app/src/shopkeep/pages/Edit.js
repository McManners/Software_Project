import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom";
import './Edit.css';
import FilterButton from '../container/FilterButton';
import QuestionIcon from "../components/QuestionIcon";
import ButtonTabs from "../components/ButtonTabs";
import DeleteItemModal from "../components/DeleteItemModal";

export default function Edit() {
    const { uuid } = useParams();
    const [item, setItem] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();

    console.log(uuid)

    const items = require('../data/stock_items.json');

    useEffect(() => {
        if (uuid !== undefined)
            items.forEach(item => {
                if (item['Item UUID'] === uuid) {
                    console.log("setting item to: " + item);
                    setItem(item);
                }
            })
    },[]);
    
    return (
        <div className='EditItem'>
            <div className='PageLayout_Header'>
                <div className='PageLayout_Header_Title'>Edit Item</div>
                <div className='PageLayout_Header_Button_Container'>
                    <FilterButton />
                </div>
            </div>
            <DeleteItemModal setDialogOpen={setDialogOpen} dialogOpen={dialogOpen} />
            <div className='EditItem_Container'>
                <ButtonTabs />
                <div className='EditItem_Grid'>
                    <div className='EditItem_Grid_Item'>
                        <div className='EditItem_Content_Header'>
                            <h3 className='EditItem_Item_Details_Header'>Item Details</h3>
                        </div>
                        <div className='edit-content-test edit-dark-border'>
                            <div className='EditItem_Grid_Item'>
                                <label htmlFor='name-input'>Name <div className='EditItem_Required_Field_Indicator'></div></label>
                                <input className='EditItem_Input' type='text' defaultValue={item['Name']} id='name-input'/>
                            </div>
                            <div>
                                <label htmlFor='Register_Status_Open'>Register Status <QuestionIcon /></label>  
                                <div className='EditItem_ActiveRegister_Wrapper'>
                                    <input className='EditItem_Register_Checkbox' type='checkbox' id='Register_Status_Open'/>
                                    <label htmlFor='Register_Status_Open' className='EditItem_Register_Checkbox_Label'>Active</label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor='department-input'>Department <QuestionIcon /></label>
                                <select className='EditItem_Input' id='department-input'>
                                    <option value='1'>{item['Department']}</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                </select>
                            </div>
                            <div>
                                <div style={{textAlign: 'left'}}>SKU <QuestionIcon /></div>
                                <div style={{textAlign: 'left', fontSize: '14px', fontWeight: '300', height: '39px', padding: '6px 0'}}>{item['Store Code (SKU)']}</div>
                            </div>
                            <div>
                                <label htmlFor='category-input'>Category <QuestionIcon /></label>
                                <select className='EditItem_Input' id='category-input'>
                                    <option value='1'>{item['Category']}</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor='upc-input'>UPC <QuestionIcon /></label>
                                <input type='text' className='EditItem_Input' defaultValue={item['UPC']} id='upc-input'/>
                            </div>
                        </div>
                    </div>
                    <div className='EditItem_Grid_Item'>
                        <div className='EditItem_Content_Header'>
                            <h3 className='EditItem_Item_Details_Header'>Pricing</h3>
                        </div>
                        <div className='edit-content-test edit-dark-border'>
                            <div>
                                <label htmlFor='sale-price-input'>Sales Price <div className='EditItem_Required_Field_Indicator'></div></label>
                                <input type='text' className='EditItem_Input' defaultValue={item['Price']} id='sale-price-input'/>
                            </div>
                            <div>
                                <label htmlFor='price-type-input'>Price Type</label>
                                <select className='EditItem_Input' id='price-type-input'>
                                    <option value='fixed'>Fixed</option>
                                    <option value='at-the-register'>At the Register</option>
                                    <option value='unit-price'>Unit Price (lb, oz, etc.)</option>
                                </select>
                                <div className='EditItem_PriceType_Explanation'>
                                    <b>Fixed</b> prices are set from this screen and can't be 
                                    changed at the Register, only adjusted through discounts.
                                </div>
                            </div>
                            <div>
                                <label htmlFor='discounts-input'>Discounts <QuestionIcon /></label>
                                <select className='EditItem_Input' id='discounts-input'>
                                    <option value='discountable' defaultValue={item['Discountable']}>Discountable</option>
                                    <option value='non-discountable' defaultValue={item['Discountable']}>Non-discountable</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor='cost-per-item-input'>Cost per Item <QuestionIcon /></label>
                                {/* <input type='text' className='EditItem_Input' defaultValue={'ii'} id='cost-per-item-input'/> */}
                                <div className='EditItem_Cost_Container'>
                                    <span>0.00</span>
                                    <span style={{lineHeight: '21px'}}><button type='button' className='EditItem_Override_Cost_Button'>Override</button></span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor='taxable-input'>Taxable</label>
                                <select className='EditItem_Input' id='taxable-input'>
                                    <option value='taxable' defaultValue={item['Taxable']}>Yes</option>
                                    <option value='non-taxable' defaultValue={item['Taxable']}>No</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor='select-tax-input'>Select Tax <QuestionIcon /></label>
                                <select className='EditItem_Input' id='select-tax-input'>
                                    <option value='test'>Add Dynamic Options</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='EditItem_Grid_Item'>
                        <div className='EditItem_Content_Header EditItem_Track_Header'>
                            <h3 className='EditItem_Item_Details_Header'>Track Quantity on Hand</h3>
                        </div>
                    </div>
                    <div className='EditItem_Grid_Item'>
                        <div className='EditItem_Content_Header edit-dark-border'>
                            <h3 className='EditItem_Item_Details_Header'>Advanced</h3>
                        </div>
                        <div className='edit-content-test edit-dark-border'>
                            <div>
                                <label htmlFor='supplier-input'>Supplier <QuestionIcon /></label>
                                <select className='EditItem_Input' id='supplier-input'>
                                    <option value={'mm'}>{item['Supplier']}</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor='supplier-item-id-input'>Supplier's Item ID <QuestionIcon /></label>
                                <input type='text' className='EditItem_Input' id='supplier-item-id-input'/>
                            </div>
                            <div>
                                <label htmlFor='ticket-printer-group-input'>Ticket Printer Group <QuestionIcon /></label>
                                <select className='EditItem_Input' id='ticket-printer-group-input'>
                                    <option value='none'>None</option>    
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='EditItem_Submit_Footer'>
                    <div className='EditItem_Submit_Footer_Container'>
                            <button type='button' className='EditItem_Submit_Footer_Button_Delete' onClick={() => setDialogOpen(true)}>
                                Delete
                            </button>
                            <div style={{flexGrow: '1'}}></div>
                            <button type='button' className='EditItem_Submit_Footer_Button_Cancel' onClick={() => navigate('/salerno/itemlist')}>
                                Cancel
                            </button>
                            <button type='button' className='EditItem_Submit_Footer_Button_Save'>
                                Save and close
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}