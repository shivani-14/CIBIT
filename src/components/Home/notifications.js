import React from 'react';
import {ToastContainer,toast,Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Notification extends React.Component {
    constructor(props){
        super(props);
        
    }

    componentDidMount(){
        
        const myres = this.props.accountdetails.map(account => ({
            type:account.account_type,
            spent:account.expense_spent,
            threshold:account.threshold_amount,
            limit:account.monthly_expense_limit
        }));
        console.log(this.props.accountdetails,myres);

        
        myres
        .forEach( account => {
            const {spent,type,threshold,limit} = account
            if((spent/limit)*100 >= threshold ){
                toast.warn(`you have crossed thresold in your monthly expense of ${type}`)
                console.log(`you have crossed thresold in your monthly expense of ${type}`);
            }
        });
        
        
    }
    
    render(){
        return <div>
                
             <ToastContainer draggable={false} transition={Zoom} autoClose={8000}   />    
        </div>
    }
}


export default Notification;