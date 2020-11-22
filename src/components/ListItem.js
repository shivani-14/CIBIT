import React from 'react';
// import {
//     Table,
//     TableBody,
//     TableHeader,
//     TableHeaderColumn,
//     TableRow,
//     TableRowColumn,
//   } from 'material-ui/Table';

class ListItem extends React.Component{
    constructor(props){
        super(props);
        //const {amount,available_balance,date,from_account_id,remark,to_account_id,transaction_id,transaction_type} = this.props.transaction;

    }
    
    render (){
        const {amount,available_balance,date,from_account_id,remark,to_account_id,transaction_id,transaction_type} = this.props.transaction;
        return(
            <div>  
            </div>
        )
    }

}
export default ListItem;