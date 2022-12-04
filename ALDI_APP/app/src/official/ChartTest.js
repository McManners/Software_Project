import React from "react";
import {useState} from "react";
import {Chart as ChartJS, ArcElement, Tooltip, Legend,} from "chart.js";
import {Doughnut} from "react-chartjs-2";
ChartJS.register(ArcElement,Tooltip, Legend);

function ChartTest(){
    const data1 = {
        labels: ['total sick', 'sick used'],
        datasets: [
            {
                data: [9, 4], //  (4/9)
                backgroundColor: ['#0497b8', '#fff'],
                borderColor: 'black',
                borderWidth: 2,
                cutout: '80%'
            }
        ],
    };

    const options = {
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
    /////
    const data2 = {
        labels: ['total personal', 'personal used'],
        datasets: [
            {
                data: [77, 24],
                backgroundColor: ["#0497b8", "#fff"],
                borderColor: 'black',
                borderWidth:2,
                cutout: '80%'
            }
        ]
    };
    const options2 = {
        plugins: {
            legend: {
                position: 'top',
                align: 'center',
                labels: {
                    color: "#000"
                }
            }
        }
    }

    /////
    const data3 = {
        labels: ['total vacation', 'vacation used'],
        datasets: [
            {
                data: [14, 7],
                backgroundColor: ["#0497b8", "#fff"],
                borderColor: 'black',
                borderWidth:2,
                cutout: '80%'
            }
        ]
    };
    const options3 = {
        plugins: {
            legend: {
                position: 'top',
                align: 'center',
                labels: {
                    color: "#000"
                }
            }
        }
    }
    /////

    return(
        <div id={'BODY'}>
            <div className={'container-fluid'} id={'main'}>
                <div className={'row'}>
                    <div>
                        {/*<p id="BalanceTitle">Balance of days off</p>*/}
                        {/*<br/>*/}
                        {/*<hr style={{backgroundColor: 'black', height: '2px', borderWidth: '2px'}}/>*/}
                    </div>
                    <div className={'col-sm'} id={'Charts'}>
                        <h2>Sick Days</h2>
                        <p>You have used X out of Y sick days for the year.</p>
                        <Doughnut type={'doughnut'} data={data1} options={options} plugins={[
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
                    <div className={'col-sm'} id={'Charts'}>
                        <h2>Personal Days</h2>
                        <p>You have used X out of Y personal days for the year.</p>
                        <Doughnut type={'doughnut'} data={data2} options={options2}/>
                    </div>
                    <div className={'col-sm'} id={'Charts'}>
                        <h2>Vacation Days</h2>
                        <p>You have used X out of Y vacation days for the year.</p>
                        <Doughnut type={'doughnut'} data={data3} options={options3} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChartTest;