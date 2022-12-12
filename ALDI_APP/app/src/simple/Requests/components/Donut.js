import './donut.css';
import React, { Component } from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend,} from "chart.js";
import {Doughnut} from "react-chartjs-2";
ChartJS.register(ArcElement,Tooltip, Legend);

class Donut extends Component {
    constructor(props) {
        super(props);
    
        const { labels, dataVal } = this.props;
    }

    data1 = {
        labels: this.labels,
        datasets: [
            {
                data: this.dataVal, //  (4/9)
                backgroundColor: ['#0497b8', '#fff'],
                borderColor: 'black',
                borderWidth: 2,
                cutout: '80%'
            }
        ],
    };

    options = {
        plugins: {
            legend: {
                position: 'top',
                align: 'center',
                labels: {
                    color: "#000"
                }
            },
        }
    }

    render() {
        return (
            <div className='Charts'>
                <Doughnut type='doughnut' data={this.data1} options={this.options} plugins={[
                    {
                        beforeDraw(chart, args, options) {
                            const {width} = chart;
                            const {height} = chart;
                            const {ctx} = chart;
                            ctx.restore();
                            const fontSize = (height / 160).toFixed()
                            ctx.font = `${fontSize}em sans-serif`;
                            ctx.textBaseline = 'top';
                            const text = "44%";
                            const textX = Math.round((width - ctx.measureText(text).width)/2);
                            const textY = height / 2;
                            ctx.fillText(text, textX, textY);
                            ctx.save();
                        }
                    }
                ]}/>
            </div>
        )
    }
}

export default Donut;