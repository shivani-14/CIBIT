import React ,{Component} from 'react';
import { Doughnut } from 'react-chartjs-2'; 
import Badge from 'react-bootstrap/Badge';
 



const chartColors ={
    red:"#ff0000",
    blue:"#00bfff",
    green:"#80ff00"
};

   
    


class Tracker extends Component{
 constructor(props){
     super(props)
   
     this.state={
        data:{
            labels:["Expense spent","Expense Left"],
               datasets:[{
                     data: [this.props.expense_spent, this.props.monthly_expense_limit-this.props.expense_spent],
                     backgroundColor:["#80ff00","#9932CC"],
                     borderWidth:2,
                     borderColor:"gray",
                        
                   }]
  }
    }}
    render(){
        return(
            <div id="Trackerchart"  >
            <h1 style={{"margin-left": "100px"}}>{this.props.account_type}</h1>
            <Doughnut data={this.state.data}   options={{responsive:true, maintainAspectRatio: true}}/>
            </div>
            

        )
    }
}

export default Tracker;