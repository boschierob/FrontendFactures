// src/components/ClientList.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import EditFormModal from './EditFormModal';
import ConfirmationDeleteModal from './ConfirmationDeleteModal';
import CreateCustomer from './CreateCustomer';



function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCreateCustomer, setShowCreateCustomer] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const handleCancel = () => {
    setShowCreateCustomer(false)
  }

  const handleCreateCustomerClick = () => {
    setShowCreateCustomer(true);
  };


  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };
  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/customers/${customerToDelete._id}`);
      // Actualisez la liste des clients ou effectuez d'autres actions nécessaires
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
    setShowDeleteModal(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await api.get('customers');
        setCustomers(response);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    }

    fetchClients();
  }, []);

  return (
    <div>
      <h1>Liste des clients</h1>
      <div style={styles.buttonContainer}>      
      </div>
      <ul>
      {customers && customers.map(customer => (
          <li key={customer._id}>
            {customer.customer_firstname} {customer.customer_lastname}
            <button onClick={() => handleEditClick(customer)}>Edit</button>
            <button onClick={() => handleDeleteClick(customer)}>Delete</button>
          </li>
        ))}
      </ul>
      { !showCreateCustomer && <button style={styles.createCustomerButton} onClick={handleCreateCustomerClick}>Créer un client</button>}
      {showCreateCustomer &&<CreateCustomer handleCancel={handleCancel} />}

      {isModalOpen && (
        <EditFormModal
          customer={selectedCustomer}
          closeModal={closeModal}
        />
      )}

{showDeleteModal && (
        <ConfirmationDeleteModal onClose={() => setShowDeleteModal(false)} handleConfirmDelete={handleConfirmDelete} customer={customerToDelete}/>
      )}
    </div>
  );
}


const styles = {
  buttonContainer: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  createCustomerButton: {
    marginLeft: '20px', // Marge à gauche du bouton
    zIndex: '999', // Assurez-vous que le bouton apparaît au-dessus du contenu
  }
};



export default CustomerList;
