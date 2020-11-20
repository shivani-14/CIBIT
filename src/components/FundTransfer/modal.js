import React from 'react';
import Modal from 'react-modal';
import './modal.css';


function MyModal(props) {

   



  const condition = {
    1: "sorry you account balance is insufficient to transfer",
    2 :  " sorry you have reached the monthly expense limit",
    3:"you have crossed the thrresold value  \n do yo want to continue ?"
      
  }
  return <Modal
    isOpen={props.details.isOpen}
    onRequestClose={props.handleClearModal}
    contentLabel="Selected Option"
    closeTimeoutMS={200}
    ariaHideApp={false}
    className="modal"
  >
    
    <h3 className="modal__title">FD Summary </h3>
    { <p className="modal__body">
        {condition[props.details.condition]}
    </p>}

    {props.details.condition===3?<><button className="button-modal" onClick={props.handleClearModal}>NO</button>
      <button className="button-modal" onClick={props.handleSuccess}>Yes</button> </>:
      <button className="button-modal" onClick={props.handleClearModal} >Okay</button> }
  </Modal>
}

export default MyModal;