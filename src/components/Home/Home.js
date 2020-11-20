
import React ,{createRef} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import Axios from 'axios';
import Notification from './notifications';
import Tracker from "./Tracker";
import { Chart as BarChartComponent } from './barchart';

class Home extends React.Component{

    constructor(props){
        super(props);
        this.alanCont=createRef();
        this.state={
          accountdetails:[],
          length:0
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
          key: 'b1460b1760481aff85ece0b9df063d582e956eca572e1d8b807a3e2338fdd0dc/stage',
          rootEl:this.alanCont.current,
       
       }) ;
     
   }
  

  
 componentDidMount(){
    this.iniatite_barchart();
   
         
      this.iniatite_voice();
   
    }
    
    render(){
        return (<div>

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