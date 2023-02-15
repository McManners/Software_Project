import React from 'react';
import ProgressRing from './ProgressRing';

class Example extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        progress: 0
      };
    }
    
    componentDidMount() {
      // emulating progress
      const interval = setInterval(() => {
        this.setState({ progress: this.state.progress + 10 });
        if (this.state.progress === 100)
          clearInterval(interval);
      }, 1000);
    }
    
    render() {
      return (
        <ProgressRing
          radius={ 100 }
          stroke={ 20 }
          progress={ this.state.progress }
        />
      );
    }
  }

  export default Example;