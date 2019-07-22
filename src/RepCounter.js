import React, {Component} from "react";
import ReactSpeedometer from "react-d3-speedometer"

class RepCounter extends Component {
    
  render() {
    return (
      <div className="rep-counter" style={{textAlign: "center",
                                           marginTop: "80px"}}>

        <div style={{textAlign: "center",
                     fontSize: "100px"}}>
          {this.props.repCount}
        </div>
        <div style={{textAlign: "center",
                     fontSize: "20px"}}>
                     reps
        </div>

        <div style={{textAlign: "center",
                     marginTop: "60px",
                     fontSize: "100px"}}>
          {this.props.weight}
        </div>
        <div style={{textAlign: "center",
                     fontSize: "20px"}}>
                     pounds
        </div>
                    
      </div>
    );
  }
}

export default RepCounter;