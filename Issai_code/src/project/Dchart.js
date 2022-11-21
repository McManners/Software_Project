import {useState} from "react";
import DoughnutChart from "./components/Doughnut";
import {UserData} from "./Data/data";


function Dchart(){
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: "users Gained",
                data: UserData.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#A020F0",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: 'black',
                borderWidth: 2,
                animations: {
                    tension: {
                        duration: 1000,
                        easing: 'linear',
                        from: 1,
                        to: 0,
                        loop: true
                    }
                },
            },
            // {
            //     label: "users lost",
            //     data: UserData.map((data) => data.userLost),
            //     backgroundColor: [
            //         "rgba(75,192,192,1)",
            //         "#A020F0",
            //         "#50AF95",
            //         "#f3ba2f",
            //         "#2a71d0",
            //     ],
            //     borderColor: 'black',
            //     borderWidth: 2,
            //     animations: {
            //         tension: {
            //             duration: 1000,
            //             easing: 'linear',
            //             from: 1,
            //             to: 0,
            //             loop: true
            //         }
            //     },
            // },
        ],

    });
    return(
        <div className={'bg-primary'}>
            <div className={'col-10 offset-1'}>
                <div className={'card'}>
                    <div className={'card-body'}>
                        <h1>doughnut chart</h1>
                        <hr/>
                        <div style={{width: 500}}>
                            <DoughnutChart ChartData={userData}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Dchart;