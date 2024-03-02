import React from 'react';
import ReactDOM from 'react-dom';
import { CgDanger } from "react-icons/cg";


function ConfirmationDeleteModal({ onClose, handleConfirmDelete, customer }) {
  return ReactDOM.createPortal(
    <div style= {styles.modalContainer}>
      <div style={styles.modalContent}>
      <button style={styles.closeModalButton} onClick={onClose}>X</button>
        <h2 style={{display: "inline-block", color: "red", transform: "translateX(-55px)"}}> 
            <CgDanger /> Attention :</h2>
        <p>Etes vous sûr de vouloir supprimer {customer.customer_firstname} {customer.customer_lastname} ?</p>
        <p>Cette opération est irréversible.</p>
         <button onClick={handleConfirmDelete}>Confirmer</button>
          <button onClick={onClose}>Annuler</button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

const styles = {
    modalContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    },
    closeModalButton: {
      cursor: 'pointer',
      transform: 'translate(-20px, -70px)',

    }
  };

export default ConfirmationDeleteModal;
