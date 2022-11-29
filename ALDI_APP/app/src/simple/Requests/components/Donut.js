import './donut.css';
import React, { Component } from 'react';

class Donut extends Component {
    constructor(props) {
        super(props);
    
        const { width, height } = this.props;
    
    }

    render() {
        return (
            <div className="donut">
                <svg height="100" width="100" viewBox="-10 -10 220 220">
                    <path className="back" d="M0,100 a100,100 0 1 0 200,0 a100,100 0 1 0 -200,0" fill="#FFFFFF" stroke="#034870" stroke-width="20" stroke-linecap="round" />
                    <path className="ring" d="M100,0 a100,100 0 0 1 0,200 a100,100 0 0 1 0,-200,0" fill="none" stroke="#FF1251" stroke-width="20" stroke-dasharray="629" stroke-linecap="round" stroke-dashoffset="629" />
                </svg>
            </div>
        )
    }
}

export default Donut;