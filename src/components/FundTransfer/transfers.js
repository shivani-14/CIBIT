import {Component} from 'react';
import Confirm from './confirm';
import Axios from 'axios';
import FtForm from './form';
import MyModal from './modal';
import './ftstyle.css';
import Success from './success';
class Transfer extends Component{
    constructor(props){
        super(props);
        this.state={
            debitedFrom:"",
            to:"",
            amount:"",
            desc:"",
            stage:1,
            condition:0,
            isOpen:false,
            accountdetails:[]
        }
        this.handleInput=this.handleInput.bind(this);
        this.handleProceed=this.handleProceed.bind(this);
        this.handleConfirm=this.handleConfirm.bind(this);
        this.handleBack=this.handleBack.bind(this);;
        this.handleClearModal=this.handleClearModal.bind(this);
        this.handleSetModal=this.handleSetModal.bind(this);
        this.handleSuccess=this.handleSuccess.bind(this);
        this.handleClear=this.handleClear.bind(this);
    }

    async initiate(){
        const username = this.props.match.params.acid;
          let accountdetails =  await Axios.get(`http://localhost:8080/customer/getAccountDetails/${username}`);
          
          
          accountdetails=accountdetails.data;
            accountdetails.map( async (account) => {
         let res = await Axios.get(`http://localhost:8080/account/spent_amount/${account.account_id}`);

            this.setState({accountdetails:[...this.state.accountdetails,{...account,expense_spent:res.data}]});
            
        });
    }
    componentDidMount(){
        this.initiate();
    }
    handleClear(){
        this.setState({
            debitedFrom:"",
            to:"",
            amount:"",
            desc:"",
            stage:1,
            condition:0,
            isOpen:false,
            accountdetails:[]
        })
        this.initiate();
    }
    handleSuccess(){
        //update balance in both from and to
        //add transaction s credit and debi
        const {debitedFrom,to,amount,desc}=this.state;
        Axios.post("http://localhost:8080/account/FundsTransfer",{
                        from_account_id:debitedFrom,
                        to_account_id:to,
                        amount:amount,
                        transaction_type:"debit",
                        remark:desc
                    })

        this.setState({
            isOpen:false,
            stage:3
        })
    }
    handleInput(e){
        if(e.target.name==="amount"&&!isNaN(e.target.value)||e.target.name!=="amount")
            this.setState({
                [e.target.name]:e.target.value
            })
    }
    handleProceed(){
        this.setState({
            stage:2
        })
    }
    handleBack(){
        this.setState({
            stage:1
        })
    }
   async handleConfirm(){
        //set the conditions 
        const uid=this.props.match.params.acid
        const {debitedFrom,to,amount,desc,accountdetails}=this.state;
      
       
       const {account_id,account_type,account_balance,expense_spent,monthly_expense_limit,threshold_amount}
                = accountdetails.find( account => account.account_id == debitedFrom);
       const balance= account_balance;
        if(balance>=amount){
           
           
            const spent=expense_spent;
            const left = monthly_expense_limit-spent;
            if(left>=amount){
                const thresold = threshold_amount
                let spentPercentage  =(spent+parseInt(amount))/(spent+left);
                spentPercentage*=100;
                console.log(spentPercentage);
                if(spentPercentage<=thresold){
                    //update balance in both dfrom and to
                    //add debit and credit transaction
                    Axios.post("http://localhost:8080/account/FundsTransfer",{
                        from_account_id:debitedFrom,
                        to_account_id:to,
                        amount:amount,
                        transaction_type:"debit",
                        remark:desc
                    })
                    this.setState({
                        stage:3,
                        
                    })
                }else{
                    //crossong the thresold
                    this.setState({
                        condition:3,
                        isOpen:true
                    })
                    
                }

            }else{
                //monthly limit crossed
                this.setState({
                    condition:2,
                    isOpen:true
                })
            }
        }else{
            //balance not sufficient
            this.setState({
                condition:1,
                isOpen:true
            })
        }
       
    }

    handleClearModal(){
        this.setState({
            isOpen:false
        })
    }
    handleSetModal(){
        this.setState({
            isOpen:true
        })
    }
    render(){
        return (
            <div className="transfer">
                <div className="transfer-header">
                    {this.state.stage===1?<h2 className="transfer-header-active">details</h2>:<h2>details</h2>}
                    {this.state.stage===2?<h2 className="transfer-header-active">confirm</h2>: <h2>confirm</h2>}
                    {this.state.stage===3?<h2 className="transfer-header-active">success</h2>:<h2>success</h2>}
                </div>
                <div className="transfer-content">
                   {this.state.stage===1&& <FtForm details={this.state} handleInput={this.handleInput} handleProceed={this.handleProceed}/>}
                   {this.state.stage===2&& <Confirm handleBack={this.handleBack} handleConfirm={this.handleConfirm}  details={this.state} />}
                   {this.state.stage===3&&<Success handleClear={this.handleClear} details={this.state}/>}
                </div>
                <MyModal details={this.state} handleSuccess={this.handleSuccess} handleClearModal={this.handleClearModal}/>
            </div>
        );
    }
}   

export default Transfer;