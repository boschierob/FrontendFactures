// src/components/ClientList.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import EditFormModal from './EditFormModal';
import ConfirmationDeleteModal from './ConfirmationDeleteModal';
import CreateCustomer from './CreateCustomer';

import { MdBorderColor, MdDeleteForever, MdEdit } from "react-icons/md";



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
      <ul style={styles.ul}>
        {customers && customers.map(customer => (
          <li key={customer._id}>
            <h4 style={{ display: "inline-block", marginRight: "20px" }}>{customer.customer_firstname} {customer.customer_lastname}</h4>
            <button onClick={() => handleEditClick(customer)} style={{ backgroundColor: "rgb(252, 241, 214)" }}>
              Edit
              <MdEdit style={{ color: "rgb(1, 22, 81)", transform: "scale(1.5)", transform: "translateX(10px)" }} />
            </button>
            <button onClick={() => handleDeleteClick(customer)} style={{ backgroundColor: "rgb(255, 237, 237)" }}>
              <MdDeleteForever style={{ color: "rgb(188, 15, 15)", transform: "scale(1.5)" }} />
            </button>
          </li>
        ))}
      </ul>

      {!showCreateCustomer && <button style={styles.createCustomerButton} onClick={handleCreateCustomerClick}>Créer un client</button>}
      {showCreateCustomer && <CreateCustomer handleCancel={handleCancel} />}

      {isModalOpen && (
        <EditFormModal
          customer={selectedCustomer}
          closeModal={closeModal}
        />
      )}

      {showDeleteModal && (
        <ConfirmationDeleteModal onClose={() => setShowDeleteModal(false)} handleConfirmDelete={handleConfirmDelete} customer={customerToDelete} />
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
  },
  ul:{
    borderLeft:' 6px solid rgb(33, 53, 71)',

  }
};



export default CustomerList;
