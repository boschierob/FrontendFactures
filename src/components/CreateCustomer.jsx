import React, { useState } from 'react';
import api from '../services/api';

function CreateCustomer({ handleCancel }) {

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
    company: '' // Ajoutez une valeur pour l'ID de l'entreprise
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
      clg
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
        company: ''
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
        <div>
          <label htmlFor="road">Rue:</label>
          <input
            type="text"
            id="road"
            name="road"
            value={customerData.customer_address.road}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="number">Numéro:</label>
          <input
            type="text"
            id="number"
            name="number"
            value={customerData.customer_address.number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="extra_info">Information supplémentaire:</label>
          <input
            type="text"
            id="extra_info"
            name="extra_info"
            value={customerData.customer_address.extra_info}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="postal_code">Code postal:</label>
          <input
            type="text"
            id="postal_code"
            name="postal_code"
            value={customerData.customer_address.postal_code}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="city">Ville:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={customerData.customer_address.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="country">Pays:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={customerData.customer_address.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="customer_number">Numéro de client:</label>
          <input
            type="text"
            id="customer_number"
            name="customer_number"
            value={customerData.customer_number}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Créer le client</button>
        <span id="cancel_btn" style={{cursor: "pointer"}} onClick={handleCancel}>Annuler</span>
      </form>

    </div>
  );
}


export default CreateCustomer;


