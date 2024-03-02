import React, { useState } from 'react';
import api from '../services/api';

function CreateCustomer({handleCancel}) {
    

  const [customerData, setCustomerData] = useState({
    customer_firstname: '',
    customer_lastname: '',
    customer_address: {
      road: '',
      number: '',
      extra_info: '',
      postal_code: '',
      city: '',
      country: ''
    },
    customer_number: '',
    prestations: [],
    interventions: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const response = await api.post('/customers', customerData);
      //console.log('New customer created:', response.data);
      // Réinitialiser le formulaire après la création réussie
      setCustomerData({
        customer_firstname: '',
        customer_lastname: '',
        customer_address: {
          road: '',
          number: '',
          extra_info: '',
          postal_code: '',
          city: '',
          country: ''
        },
        customer_number: '',
        prestations: [],
        interventions: []
      });
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <div>
      <h2>Créer un nouveau client</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customer_firstname">Prénom:</label>
          <input
            type="text"
            id="customer_firstname"
            name="customer_firstname"
            value={customerData.customer_firstname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="customer_lastname">Nom:</label>
          <input
            type="text"
            id="customer_lastname"
            name="customer_lastname"
            value={customerData.customer_lastname}
            onChange={handleChange}
          />
        </div>
        {/* Ajoutez ici d'autres champs pour l'adresse, le numéro de client, etc. */}
        <button type="submit">Créer le client</button>
        <span id="cancel_btn" onClick={handleCancel}>Annuler</span>
      </form>
      
    </div>
  );
}


export default CreateCustomer;


