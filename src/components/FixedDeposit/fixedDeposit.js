import React from 'react';
import './style.css';
import Form from './form';
import FDchart from './fdchart';
import MyModal from './modal';
import Axios from 'axios';
import Success from './success';
class Fd extends React.Component{

    constructor(props){
        super(props);
        this.state={
            principal:'',
            roi:'',
            tp:'',
            timeperiod:'',
            debitedFrom:'',
            isOpen:false,
            condition:0,
            stage:1,
            accountdetails:[]
            
        }
        
        this.handleDeposit=this.handleDeposit.bind(this);
        this.handleModal=this.handleModal.bind(this);
        this.handleInput=this.handleInput.bind(this);
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
        // console.log(value);
    }

    handleClear(){
        
        this.setState({
            principal:'',
            roi:'',
            tp:'',
            timeperiod:'',
            debitedFrom:'',
            isOpen:false,
            condition:0,
            stage:1,
            accountdetails:[]
        })
        this.initiate();
        
    }
    handleSuccess(){
        const {principal,debitedFrom}=this.state;
        Axios.post("http://localhost:8080/account/FixedDeposit",{
            from_account_id:debitedFrom,
            amount:principal,
            transaction_type:"debit",
            remark:"fd"
        }).then(res => console.log(res));
        this.setState(
            {
                stage:2,
                isOpen:false
            }
        )
    }
    handleModal(){
        
        this.setState({
            isOpen:!this.state.isOpen
        })
    }
    async handleDeposit(){

        const uid=this.props.match.params.acid;
        const {principal,debitedFrom}=this.state;

        const {account_balance,expense_spent,monthly_expense_limit,threshold_amount} = this.state.accountdetails.find(account => {
            console.log(account.account_id,debitedFrom);
            return account.account_id==debitedFrom
        })
       
        const left = monthly_expense_limit - expense_spent
        
        console.log(left,principal)
        if(left>=principal){
                
                         
                
                console.log(account_balance,"bal")
                if(account_balance>=principal){
                   
                    let spentPercentage = (expense_spent+parseInt(principal))/(expense_spent+left)
                    spentPercentage*=100;
                    console.log(spentPercentage,threshold_amount);
                    if(spentPercentage<=threshold_amount){
                       
                       Axios.post("http://localhost:8080/account/FixedDeposit",{
                           from_account_id:debitedFrom,
                           amount:principal,
                           transaction_type:"debit",
                           remark:"fd"

                       }).then(res =>  console.log(res)
                        )

                        this.setState({
                            stage:2
                        })
                    }else{
                        this.setState({
                            isOpen:true,
                            condition:3
                        })
                    }
                    
                   
                }
                else{
                    this.setState({
                        condition:2,
                        isOpen:true
                    })
                    
                }
        
        }
        else{
            this.setState({
                isOpen:true,
                condition:1
            })
             
        } 
        
        console.log("after in depo");
    }



    
    handleInput(e){
       if(!isNaN(e.target.value)||e.target.name==='timeperiod'||e.target.name==='debitedFrom'){
            this.setState({
                [e.target.name]:e.target.value,  
                
            }) 
        }
    }
    render(){
        return (
            <>
                <div className="fd">
                
                    <div className="header">
                       {this.state.stage===1?<div className="header-active">Deposit</div>: <div>Deposit</div>}
                       {this.state.stage===2?<div className="header-active">Success</div>:<div>Success</div>}
                    </div>
                    <div className="component">
                       
                            
                            {this.state.stage===1 && 
                               
                               <>
                                <div className="component-item">
                                    <Form details={this.state} handleInput={this.handleInput} handleDeposit={this.handleDeposit}/>
                                </div>
                                    {
                                        this.state.tp!==''&&this.state.principal!==''&&this.state.roi!==''&&this.state.timeperiod!==""?
                                            <div  className="component-item">
                                        
                                                <FDchart details={this.state} />
                                            </div>
                                        :
                                        ""
                                    } 
                               </>
                             }{
                                 this.state.stage===2 && <Success handleClear={this.handleClear} details={this.state} />
                             }
                       
                        
                </div>
                </div>
                <MyModal handleModal={this.handleModal} handleSuccess={this.handleSuccess} details={this.state}/>  
            </>
        )
    }
}



export default Fd;