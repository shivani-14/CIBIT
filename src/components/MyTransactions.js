import React from 'react';
import Axios from 'axios';
import './MyTransactions.css';

class MyTransactions extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            accountdetails: [],
            account_id: '',
            transactions:[]
        }
    }

    async initiate(){
        const username = this.props.match.params.acid;
          let accountdetails =  await Axios.get(`http://localhost:8080/customer/getAccountDetails/${username}`);
          console.log(accountdetails);
          accountdetails = accountdetails.data;
          this.setState({accountdetails})

    }
    
    componentDidMount(){
        this.initiate();
        
    }
    async handleInput(e){
        console.log(e.target.name,e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
        let transactions = await Axios.get(`http://localhost:8080/account/MyTransactions/${e.target.value}`)
        transactions = transactions.data;
        this.setState({transactions})


    }
    
    render(){
        return(
            <div className="transactions">
                <select className="form-input"  name="account_id" onChange={e => this.handleInput(e)} style={{"marginLeft":"700px","marginTop":"20px","marginBottom":"30px"}} responsive="true">

               <option value="">Debited from </option >
                {/* <option className="form-input__option"value="savings">Savings</option>
                <option className="form-input__option"value="credit">Credit card</option>
                <option className="form-input__option"value="current">current</option>
                 */}

                 {
                     this.state.accountdetails.map( account => 
                            <option key={account.account_id} className="form-input__option" value={account.account_id}>{account.account_type}</option> 
                    )
                 }
                
            </select>


            {this.state.account_id !== '' && 
                <div >

                
                <table border="2" style={{"textAlign":"center","margin":" 0 auto"}} id='transaction'>
                
                <thead>
                
                  <th>amount</th>
                  <th>available_balance</th>
                  <th>remark</th>
                  <th>date</th>
                  <th>to_account_id</th>
                  <th>transaction_type</th>
                  
                
                </thead>
                 
                
                <tbody>
                 
                    {this.state.transactions.map(transaction => 
                        <tr key={transaction.transaction_id}>
                        
    
                            <td >{transaction.amount}</td>
                            {transaction.transaction_type === "debit" ? <td style={{"color":"red"}}> {transaction.available_balance}</td> : <td style={{"color":"green"}}> {transaction.available_balance}</td>}
                            <td>{transaction.remark}</td>
                            <td>{transaction.date.substring(0,10)}</td>
                            <td>{transaction.to_account_id}</td>
                            <td >{transaction.transaction_type}</td>
                        </tr>


                        )}
                </tbody>        
                </table>
                

            
            </div>}
            
            </div>
        )
    }
    

}

export default MyTransactions;