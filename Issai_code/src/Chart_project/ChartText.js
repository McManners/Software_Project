import React from "react";
import {useState} from "react";
import {Chart as ChartJS, ArcElement, Tooltip, Legend,} from "chart.js";
import {Doughnut} from "react-chartjs-2";
ChartJS.register(ArcElement,Tooltip, Legend);


function ChartText(){
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Weekly Sales',
            data: [18, 12, 6, 9, 12, 3, 9],
            backgroundColor: [
                'rgba(255, 26, 104, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(0, 0, 0, 0.2)'
            ],
            borderColor: [
                'rgba(255, 26, 104, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(0, 0, 0, 1)'
            ],
            borderWidth: 1
        }]
    };

    // config
    const config = {
        options: {
            plugins:{
                maintainAspectRatio: 2,
                animation: {
                    duration: 0
                },
                legend:{
                    display: false
                }
            }
            }
        }

    return(
     <div className={'container-fluid'}>
         <div className="chartMenu">
             <p>WWW.CHARTJS3.COM (Chart JS 3.9.1)</p>
         </div>
         <div className="chartCard">
             <div className="chartBox">
                 <Doughnut id={'myChart'} type={'doughnut'} data={data} options={config}/>
             </div>
         </div>
     </div>
    )
}
export default ChartText;