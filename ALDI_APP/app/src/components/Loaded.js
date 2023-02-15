import React, { useEffect, useRef } from 'react';
import './loaded.css';
import { Dimmer, Loader } from "semantic-ui-react";

const Loaded = () => {

    const loadedRef = useRef();

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
    async function wait(delay) {
        await timeout(250); //for 1 sec delay
        loadedRef.current.style.width = '0';
    }

    useEffect(() => {
        wait();
    }, []);
    return (
        <div className='loaded' ref={loadedRef}>
            Loading...
            {/* <div className='Loader' >
                <Dimmer active inverted size='massive' >
                    <Loader inverted>Loading</Loader>
                </Dimmer>
            </div> */}
        </div>
    )
}

export default Loaded;