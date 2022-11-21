import React from "react";
import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS } from 'chart.js/auto'

function DoughnutChart({ChartData}){
    return <Doughnut type={"doughnut"} data={ChartData} />
}

export default DoughnutChart;