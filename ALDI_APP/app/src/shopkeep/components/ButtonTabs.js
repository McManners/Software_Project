import { useNavigate } from "react-router-dom";
import './buttontabs.css';

const ButtonTabs = () => {
    const navigate = useNavigate();
    console.log(window.location.href);

    const GeneralButton = () => {
        if (window.location.href.match('localhost:3000\/salerno\/items\/.*\/edit') || window.location.href.match('localhost:3000\/salerno\/items\/.*\/edit'))
            return (
                <button className='ButtonTabs_Current ButtonTabs_General'>
                    <span className='ButtonTabs_Span_Text'>General</span>
                </button>
            )
        return (
            <button className='ButtonTabs_Not_Current ButtonTabs_General' onClick={() => navigate('/salerno/items/1/edit')}>
                <span className='ButtonTabs_Span_Text'>General</span>
            </button>
        )
    }
    const ModifiersButton = () => {
        if (window.location.href.match('localhost:3000\/salerno\/items\/.*\/modifiers'))
            return (
                <button className='ButtonTabs_Current ButtonTabs_Modifiers'>
                    <span className='ButtonTabs_Span_Text'>Modifiers</span>
                </button>
            )
        return (
            <button className='ButtonTabs_Not_Current ButtonTabs_Modifiers' onClick={() => navigate('/salerno/items/1/modifiers')}>
                <span className='ButtonTabs_Span_Text'>Modifiers</span>
            </button>
        )
    }
    const LabelPrintingButton = () => {
        return (
            <button className='ButtonTabs_Not_Current ButtonTabs_LabelPrinting'>
                <span className='ButtonTabs_Span_Text'>Label Printing</span>
            </button>
        )
    }

    return (
        <>
            <GeneralButton />
            <ModifiersButton />
            <LabelPrintingButton />
        </>
    )
}

export default ButtonTabs;