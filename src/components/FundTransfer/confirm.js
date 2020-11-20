import React from 'react';

class Confirm extends React.Component{
    constructor(props){
        super(props);
    }




    render(){
        const {details,handleConfirm,handleBack}=this.props;
        return (
            <div className="confirm">
                <div className="confirm-content">
                     <table>
                         <tbody>
                         <tr>
                             <th>
                                 Beneficiary Account Number
                             </th>
                             <td>
                                 {details.to}
                             </td>
                         </tr>
                         <tr>
                             <th>
                                 Debited from
                             </th>
                             <td>
                                 {details.debitedFrom}
                             </td>
                         </tr>
                         <tr>
                             <th>
                                 Amount
                             </th>
                            <td>
                                {details.amount}
                            </td>
                         </tr>
                         <tr>
                             <th>
                                 Description
                            </th>
                            <td>
                                {details.desc}
                            </td>
                         </tr>
                        </tbody>
                     </table>
                </div>
                <div className="confirm-footer">
                        <button className="ft-button" onClick={handleBack}>back</button>
                        <button className="ft-button" onClick={handleConfirm}>Confirm</button>
                </div>
            </div>
        );
    }
}


export default Confirm;