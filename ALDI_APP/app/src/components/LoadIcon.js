import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LoadingIcon extends Component {

    // https://medium.com/weekly-webtips/how-to-add-a-loading-spinner-to-your-react-js-project-568204532637

	render() {
		const options = {
			animationEnabled: true,
			subtitles: [{
				text: "Loading...",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}]
		}
		return (
            <div>
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
		);
	}
}

export default LoadingIcon;