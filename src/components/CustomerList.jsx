// src/components/ClientList.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import EditFormModal from './EditFormModal';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
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
      <ul>
      {customers && customers.map(customer => (
          <li key={customer._id}>
            {customer.customer_firstname} {customer.customer_lastname}
            <button onClick={() => handleEditClick(customer)}>Edit</button>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <EditFormModal
          customer={selectedCustomer}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default CustomerList;
