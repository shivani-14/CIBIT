import { Doughnut } from 'react-chartjs-2';
import React,{useEffect,useState} from 'react';

 const FDchart=({details})=>{
     
      let {principal,roi,tp,timeperiod,...rest}=details;
        principal=parseInt(principal)
        roi=parseFloat(roi)/100
        tp=parseInt(tp);
        if(timeperiod==="Months"){
          tp=tp/12;
        }
          const interest = (principal*Math.pow((1+roi/4),4*tp))-principal;
          console.log(principal,roi,tp,timeperiod,interest)
           const  chartData={ labels:['Total Investment' , 'Total Interest'],
             datasets:[
                 {
                   label:'FD calculator',
                   data:[principal,interest],
                  backgroundColor:['#9932CC','#00FA9A'],
                  borderWidth:1
                 }
             ]
         }
     
     
     return(
         <div>
           Maturity value:{principal+interest}
          <Doughnut
         data={chartData}
         options={{ 
            responsive:true, 
            maintainAspectRatio: true}}
          />
      </div>
     )

 }


 export default FDchart;