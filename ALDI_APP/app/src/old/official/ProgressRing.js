import React from 'react';

class ProgressRing extends React.Component {
    constructor(props) {
      super(props);
  
      const { radius, stroke } = this.props;
  
      this.normalizedRadius = radius - stroke * 2;
      this.circumference = this.normalizedRadius * 2 * Math.PI;
    }
    render() {
        const { radius, stroke, progress } = this.props;
        const strokeDashoffset = this.circumference - progress / 100 * this.circumference;
        const biggerStrokeDashOffset = 4 + (this.circumference - progress / 100 * this.circumference);
        
        return (
            <div>
                <svg
                    height={ radius * 2}
                    width={ radius * 2}
                    >
                    <circle
                    stroke="black"
                    fill="transparent"
                    strokeWidth={ stroke }
                    strokeDasharray={ this.circumference + ' ' + this.circumference }
                    style={ { strokeDashoffset: strokeDashoffset - 4 } }
                    stroke-width={ stroke + 10 }
                    r={ this.normalizedRadius }
                    cx={ radius }
                    cy={ radius }
                    />
                </svg>
                <svg style={{position: "relative", top: "-204px"}}
                    height={radius * 2}
                    width={radius * 2}
                    >
                    <circle
                    stroke="blue"
                    fill="transparent"
                    strokeWidth={ stroke }
                    strokeDasharray={ this.circumference + ' ' + this.circumference }
                    style={ { strokeDashoffset } }
                    stroke-width={ stroke }
                    r={ this.normalizedRadius }
                    cx={ radius }
                    cy={ radius }
                    />
                    <text x="70" y="115" fontSize="50" fill="orange" fontWeight="bold">10</text>
                </svg>
          </div>
        );
      }
}
export default ProgressRing;