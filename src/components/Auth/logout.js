

import {Redirect} from 'react-router-dom';
import React from 'react';

class Logout extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        
        this.props.handleLogout(null,false,"");
        this.props.history.push("/");
        return null;
    }
}



export default Logout;