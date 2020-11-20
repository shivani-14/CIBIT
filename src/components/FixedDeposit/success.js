import React from 'react';
import { AiOutlineSmile } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
class Success extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {principal,roi,tp,timeperiod}=this.props.details;
        return <div style={{ "text-align": "center" }} >
        <div  className="fdsuccess">
            <AiOutlineSmile style={{ "font-size": "100px" ,"margin-left": "170"}} />
             <h5 style={{ "text-align": "center" }}>you have deposited {principal} <BiRupee />   for {tp} {timeperiod} at the rate of {roi}% interest</h5>
            <h2> Fixed Deposit successfully completed</h2>

        </div>
            <button className="ft-button" onClick={this.props.handleClear}>Okay</button>

        </div>
    }
}

export default Success;