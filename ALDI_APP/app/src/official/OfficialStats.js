import ChartTest from "./ChartTest";
import "./CSS/StatsCss.css"
function OfficialStats(){
    return(
        <div>
            <body className="stats-page-body">
            <div className="stats-page">
                <div className="sidebar-picture">
                    <span className="extended-logo"><img src="AL_BLR_LA_MC_RGB.png" height="60"
                                                         width="130"/></span>
                </div>

                <div className="main-content">
                    <div className="stats-container">
                        <div className="container-stats-1">
                            <div className="title">Balance of days off</div>
                            <div className="content-stats-page">
                                <div className="container-fluid">
                                    <div className="row">
                                        <ChartTest/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </body>
        </div>
    );
}
export default OfficialStats;