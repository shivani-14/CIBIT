import React from 'react';
import Modal from 'react-modal';
import './modal.css';


function MyModal(props) {
  const condition = {
    2: "sorry you account balance is \n insufficient to transfer",
    1 :  " sorry you have reached \n the monthly expense limit",
    3:"you have crossed the thrresold value  \n do yo want to continue ?"
      
  }
   
  return <Modal
    isOpen={props.details.isOpen}
    onRequestClose={props.handleModal}
    contentLabel="Selected Option"
    closeTimeoutMS={200}
    ariaHideApp={false}
    className="modal"
  >
    
    <h3 className="modal__title">FD Summary  </h3>
    { <p className="modal__body">
   
                       {condition[props.details.condition]} 
        </p>}
    { props.details.condition===3?
     <div style={{display:"flex",justifyContent:"space-around"}}>
  
      <button className="button-modal" onClick={props.handleModal}>NO</button>
      <button className="button-modal" onClick={props.handleSuccess}>Yes</button> 
    </div> :
      <button className="button-modal" onClick={props.handleModal} >Okay</button> }
  </Modal>
}

export default MyModal;