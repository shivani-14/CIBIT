

import React from 'react';
import './style.css';
function Form({details,handleInput,handleDeposit}) {
    const {principal,roi,timeperiod,tp,debitedFrom,accountdetails}=details
    const check=principal&&roi&&timeperiod&&tp&&debitedFrom;
    return (
        <div className="form">
            
            <input className="form-input"  value={principal} type="text" name="principal" placeholder="principal" onInput={(e) => handleInput(e)}></input>
            <input className="form-input" value={roi} type="text" name="roi" placeholder="rate Of Interest" onInput={(e) => handleInput(e)}></input>
            
            <div className="form-input">
                <input type="text" value={tp} placeholder="timeperiod" className="form-input__child" name="tp"onInput={(e) => handleInput(e)} ></input>
                <select  className="form-input__child" name="timeperiod" onChange = {(e) => handleInput(e)}>
                    <option  className="form-input__option" value=""></option>

                    <option className="form-input__option"value="Months">Months</option>
                    <option className="form-input__option"value="years">years</option>
                
                </select>
            </div>           
            <select className="form-input"  name="debitedFrom" onChange={e => handleInput(e)}>
               <option value="">Debited from </option >
                {/* <option className="form-input__option"value="savings">Savings</option>
                <option className="form-input__option"value="credit">Credit card</option>
                <option className="form-input__option"value="current">current</option>
                 */}

                 {
                     accountdetails.map( account => 
                            <option key={account.account_id} className="form-input__option" value={account.account_id}>{account.account_type}</option> 
                    )
                 }
                
            </select>
            {check &&<input className="button" type="button" value="Deposit" onClick={e => handleDeposit()}></input>}
        </div>
    )
}


export default Form;



 