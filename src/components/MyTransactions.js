import React from 'react';
import Axios from 'axios';
import ListItem from './ListItem';

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
            <div>
                <select className="form-input"  name="account_id" onChange={e => this.handleInput(e)} style={{"margin-left":"500px","margin-top":"20px","margin-bottom":"30px"}}>

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

                
                <table border="2" style={{"textAlign":"center","margin":" 0 auto"}}>
                
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
                            <td>{transaction.available_balance}</td>
                            <td>{transaction.remark}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.to_account_id}</td>
                            <td>{transaction.transaction_type}</td>
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