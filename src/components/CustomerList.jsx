// src/components/ClientList.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import EditFormModal from './EditFormModal';
import ConfirmationDeleteModal from './ConfirmationDeleteModal';
import CreateCustomer from './CreateCustomer';
import UpdateCustomer  from "./UpdateCustomer";
import ButtonUpdate from './ButtonUpdate';
import CompanySelector from './CompanySelector';

import { MdEdit } from "react-icons/md";



function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateCustomerModal, setUpdateCustomerModal] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCreateCustomer, setShowCreateCustomer] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const handleCancel = () => {
    setShowCreateCustomer(false)
  }

  const handleCloseCreateCustomerModal = () => {
    setShowCreateCustomer(false)
  }
  const handleCreateCustomerClick = () => {
    setShowCreateCustomer(true);
  };


  const handleUpdateCustomerDatas = (customer) => {
    setSelectedCustomer(customer);
    setUpdateCustomerModal(true);
    console.log('data sent to modal' +JSON.stringify(customer));
  };

  const handleConfirmUpdateCustomerDatas = () => {
    // Logique pour confirmer les modifications, par exemple en envoyant les données modifiées au serveur
    setUpdateCustomerModal(false);
  };

  const handleCancelUpdateCustomerDatas = () => {
    // Logique pour annuler les modifications, par exemple en réinitialisant les données modifiées
    setUpdateCustomerModal(false);
  };



  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };
  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async (customerToDeleteId) => {
    try {
      await api.delete(`customers/${customerToDeleteId}`);
      setCustomers(customers.filter(customer => customer._id !== customerToDeleteId));
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
  }, [showCreateCustomer]);

  return (
    <div>
      <CompanySelector />
      <h1>Liste des clients</h1>
      <div style={styles.buttonContainer}>
      </div>
      <ul style={styles.ul}>
        {customers && customers.map(customer => (
          <li key={customer._id}>
            <h4 style={{ display: "inline-block", marginRight: "20px" }}> <a style={{ color: "rgb(1, 22, 81)", cursor: "pointer" }} onClick={() => handleUpdateCustomerDatas(customer)}> {customer.customer_firstname} {customer.customer_lastname}</a></h4>
            <button onClick={() => handleEditClick(customer)} style={{ backgroundColor: "rgb(252, 241, 214)" }}>
              Edit
              <MdEdit style={{ color: "rgb(1, 22, 81)", transform: "scale(1.5),translateX(10px) " }} />
            </button>
            <button onClick={() => handleDeleteClick(customer)} style={{ backgroundColor: "rgb(255, 237, 237)" }}>
              X
            </button>
            <hr />

          </li>
        ))}
      </ul>


      {!showCreateCustomer && <button style={styles.createCustomerButton} onClick={handleCreateCustomerClick}>Créer un client</button>}
      {showCreateCustomer && <CreateCustomer handleCancel={handleCancel} customers={customers} handleCloseCreateCustomerModal={handleCloseCreateCustomerModal}/>}
     
      {updateCustomerModal && (
              <UpdateCustomer 
                data={selectedCustomer}
                onConfirm={handleConfirmUpdateCustomerDatas}
                onCancel={handleCancelUpdateCustomerDatas}
              />
            )}

      {isModalOpen && (
        <EditFormModal
          customer={selectedCustomer}
          closeModal={closeModal}
        />
      )}

      {showDeleteModal && (
        <ConfirmationDeleteModal onClose={() => setShowDeleteModal(false)} handleConfirmDelete={() => handleConfirmDelete(customerToDelete._id)} customer={customerToDelete} />
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
  ul: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderLeft: ' 6px solid rgb(33, 53, 71)',

  },
  deleteButton: {
    display:'none',
  },
  hr: {
    color: 'black',
  }
};



export default CustomerList;
