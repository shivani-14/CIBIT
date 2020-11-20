import React from 'react';

import { AiOutlineSmile } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
class Success extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {debitedFrom,to,amount,desc}=this.props.details;
        return <div style={{ "text-align": "center" }}>
        <div  className="fdsuccess">
            <AiOutlineSmile style={{ "font-size": "100px" ,"margin-left": "170"}} />
             <h5 style={{ "text-align": "center" }}> You have transfered {amount} <BiRupee/> from {debitedFrom} to {to} on the purpose of {desc}</h5>
            <h2> Funds Transfered successfully completed</h2>

        </div>
            <button className="ft-button" onClick={this.props.handleClear}>Okay</button>
        </div>
    }
}

export default Success;