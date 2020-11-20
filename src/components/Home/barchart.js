import React from 'react'

import { Bar as BarChart } from 'react-chartjs-2'

export const Chart = (props) => {
    
  

  const balanceinfo=props.accountdetails.map(account => (account.account_balance));
  const balancetype=props.accountdetails.map(account => account.account_type)
  console.log(props.accountdetails);
   const  datasets =  { 
       labels: balancetype,

       datasets:[
    {
      data: balanceinfo,
      backgroundColor: '#74B649',
      borderColor: '#36404D',
      borderWidth: 2,
      hoverBackgroundColor: '#75D9FD',
      hoverBorderColor: '#75D9FD',
    }
]
}
  
 
  return (
    <div style={{ position: "relative", margin: "auto", width: "50vw", height: '50vh' }}>
    <BarChart
      data={datasets}
      width={2}
      height={10}
      options={{
        maintainAspectRatio: false
      }}
    />
    </div>
  )
}
    