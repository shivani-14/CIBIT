import React ,{createRef} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import Axios from 'axios';
import Notification from './notifications';
import Tracker from "./Tracker";
import { Chart as BarChartComponent } from './barchart';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

class Home extends React.Component{

    constructor(props){
        super(props);
        this.alanCont=createRef();
        this.state={
          accountdetails:[],
          length:0,
          b:[]
              }
    }
   async iniatite_barchart(){
      
    const username = this.props.match.params.acid;
          let accountdetails =  await Axios.get(`http://localhost:8080/customer/getAccountDetails/${username}`);
          
          this.setState({
              length:accountdetails.data.length
          })
          accountdetails=accountdetails.data;
         await accountdetails.map( async (account) => {
         let res = await Axios.get(`http://localhost:8080/account/spent_amount/${account.account_id}`);
            
this.setState({accountdetails: [...this.state.accountdetails,{...account,expense_spent:res.data}]})
})
}
   iniatite_voice(){
      const uid = this.props.match.params.acid;
      this.alanBtnInstance = alanBtn({ 
          key: '07718ab417b08c5db5535b817766009f2e956eca572e1d8b807a3e2338fdd0dc/stage',
          onCommand: function ({command,values}) {
            if (command === "cibit")//savings
             {
             console.log("it came here")
             console.log(values)
             let c=values[0].value
            Axios.get(`http://localhost:8080/customer/getAccountDetails/${uid}`)
                .then((response)=>{
                console.log(response.data[0].monthly_expense_limit);
                let a=response.data[0].account_balance
                let b=response.data[0].monthly_expense_limit
                console.log(a);
                  if(c>b){
                 toast.warn("you have reached maximum monthly limit");
                 alanBtn().playText(`you have reached maximum monthly limit this purchase is not advisable`);

                  }else{
                  toast.warn(`you have balance amount of ${a} and your Monthly Expense Limit is ${b} and its okay to purchase amount of ${c}`);
                  alanBtn().playText(`you have balance amount of ${a} and your Monthly Expense Limit is ${b} and its okay to purchase amount of ${c}`);
                }
                })
                
            }else if(command === "cibit1")//credit
            {

              Axios.get(`http://localhost:8080/customer/getAccountDetails/${uid}`)
                .then((response)=>{
                console.log(response.data[1].monthly_expense_limit);
                let a=response.data[1].account_balance
                let b=response.data[1].monthly_expense_limit
                let c=values[0].value
                console.log(a);
                  if(c>b){
                 toast.warn("you have reached maximum monthly limit");
                 alanBtn().playText(`you have reached maximum monthly limit this purchase is not advisable`);
                  }else{
                    toast.warn(`you have balance amount of ${a} and your Monthly Expense Limit is ${b} and its okay to purchase amount of ${c}`);
                    alanBtn().playText(`you have balance amount of ${a} and your Monthly Expense Limit is ${b} and its okay to purchase amount of ${c}`);
                  }
                })

            }
            else if(command === "cibit2")//current
            {
              Axios.get(`http://localhost:8080/customer/getAccountDetails/${uid}`)
                .then((response)=>{
                console.log(response.data[2].monthly_expense_limit);
                let a=response.data[2].account_balance
                let b=response.data[2].monthly_expense_limit
                let c=values[0].value
                console.log(a);
                  if(c>b){
                 toast.warn("you have reached maximum monthly limit");
                 alanBtn().playText(`you have reached maximum monthly limit this purchase is not advisable`);

                  }else{
                    toast.warn(`you have balance amount of ${a} and your Monthly Expense Limit is ${b} and its okay to purchase amount of ${c}`);
                    alanBtn().playText(`you have balance amount of ${a} and your Monthly expense limit is ${b} and its okay to purchase amount of ${c}`);
                  }
                })
              
            }
            else{
              alanBtn().playText('Please try that again...');
            }
          },
          rootEl:this.alanCont.current,
       
       },[]) ;
     
   }
  

  
 componentDidMount(){
    this.iniatite_barchart();
   
         
      this.iniatite_voice();
   
    }
    
    render(){
        return (<div>
          <div className="header">
            <div style={{"display":"flex"}}>
          <h3>Welcome</h3>
          <h3 className="header-active" style={{"margin-left":"10px","padding-top":"2px"}}>{this.props.match.params.acid}</h3> 
            </div>
          </div>

              <BarChartComponent accountdetails={this.state.accountdetails} />
              <div style={{ margin: `50px`, display: `flex`, flexDirection: `row` ,justifyContent:`center`}}>

              {this.state.accountdetails.map((account) =>(
                  <Tracker  key={account.account_id} {...account} />
              ))}

              </div>

             {this.state.accountdetails.length===this.state.length &&  
             <Notification  accountdetails={this.state.accountdetails}/>}
             <div ref={this.alanCont}> </div>
        </div>)



    }
}


export default Home;