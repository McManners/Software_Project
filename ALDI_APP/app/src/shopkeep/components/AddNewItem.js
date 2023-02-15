import React, { useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';
import { useNavigate } from 'react-router-dom';
import './addnewitem.css';

const AddNewItemDialog = ({ setAddNewItemOpen, addNewItemOpen, addBasicItemOpen, setAddBasicItemOpen, dialogOpen, setDialogOpen }) => {
    const navigate = useNavigate();

    const handleBasicItemClick = () => {
        setAddBasicItemOpen(false);
        setDialogOpen(false);
        setAddNewItemOpen(false);
    }
    const AddBasicItem = () => {
        return (
            <div className='AddNewItem_Dialog_Container' onClick={e => e.stopPropagation()}>
                <div className='AddNewItem_Dialog_Header'>
                    <h4>New Basic Item</h4>
                    <div>
                        <button className='AddNewItem_Dialog_Close_Button'>
                            <IconContext.Provider value={{ style: { verticalAlign: 'middle' }, size: '1.4em' }}>
                                <IoMdClose onClick={handleBasicItemClick} className='AddNewItem_Dialog_Close_Icon' />
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
                <div className='NewBasicItem_Dialog_Content'>
                    <div className='NewBasicItem_Dialog_Content_Left'>
                        <div className='NewBasicItem_Label_Wrapper'>
                            <label htmlFor='item-name' className='NewBasicItem_Label'>Item Name</label>
                        </div>
                        <input type='text' id='item-name' className='NewBasicItem_Input' />
                    </div>
                    <div className='NewBasicItem_Dialog_Content_Right'>
                        <div className='NewBasicItem_Label_Wrapper'>
                            <label htmlFor='item-price' className='NewBasicItem_Label'>Item Price</label>
                        </div>
                        <input type='text' id='item-price' className='NewBasicItem_Input' placeholder='0.00' />
                    </div>
                </div>
                <div className='NewBasicItem_Footer_Container'>
                    <div className='NewBasicItem_Footer_More_Wrapper'>
                        <button type='button' className='NewBasicItem_Footer_More_Button'>More fields...</button>
                    </div>
                    <div className='NewBasicItem_Footer_Button_Container'>
                        <button type='button' className='NewBasicItem_Footer_Cancel_Button'>Cancel</button>
                        <button type='button' className='NewBasicItem_Footer_Save_Button'>Save</button>
                    </div>
                </div>
            </div>
        )
    }
    const ChooseType = () => {
        return (
            <div className='AddNewItem_Dialog_Container' onClick={e => e.stopPropagation()}>
                <div className='AddNewItem_Dialog_Header'>
                    <h4>Choose your item type</h4>
                    <div>
                        <button className='AddNewItem_Dialog_Close_Button'>
                            <IconContext.Provider value={{ style: { verticalAlign: 'middle' }, size: '1.4em' }}>
                                <IoMdClose onClick={handleBasicItemClick} className='AddNewItem_Dialog_Close_Icon' />
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
                <div className='AddNewItem_Dialog_Content'>
                    <div className='AddNewItem_Dialog_Content_Left'>
                        <div className='AddNewItem_Dialog_Content_Header'>Basic Item</div>

                        <div className='AddNewItem_Dialog_Content_Description'>
                            Sell this item individually.
                        </div>
                        <div className='AddNewItem_Dialog_Content_Button_Wrapper'>
                            <button className='AddNewItem_Dialog_Button' onClick={setAddBasicItemOpen} >Create</button>
                        </div>
                        <div className='AddNewItem_Image_Basic AddNewItem_Image'></div>
                    </div>
                    <div className='AddNewItem_Type_Spacer'>or</div>
                    <div className='AddNewItem_Dialog_Content_Right'>
                        <div className='AddNewItem_Dialog_Content_Header'>Item with Variants</div>
                        <div className='AddNewItem_Dialog_Content_Description'>
                            Sell this item in variations.
                        </div>
                        <div>
                            <button className='AddNewItem_Dialog_Button' onClick={() => navigate('/salerno/edit/new')}>Create</button>
                        </div>
                        <div className='AddNewItem_Image_Variants AddNewItem_Image'></div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='AddNewItem_Dialog' style={ dialogOpen ? {display: 'block'} : {display: 'none'} } onClick={handleBasicItemClick}>
            <div className='AddNewItem_Dialog_Backdrop'></div>
                {
                    (addBasicItemOpen ? <AddBasicItem /> : <ChooseType />)
                }
        </div>
    )
}

export default AddNewItemDialog;