import React, { useState, useEffect } from 'react';
import api from '../services/api';

function CreateCustomer({ handleCancel, customers, handleCloseCreateCustomerModal }) {

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
    customer_number: '0',
    company: ''
  });

  const [companyChoices, setCompanyChoices] = useState([])


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setCustomerData({
        ...customerData,
        [parent]: {
          ...customerData[parent],
          [child]: value
        }
      });
    } else {
      setCustomerData({
        ...customerData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(customerData);
      const response = await api.post('customers', customerData);
      console.log('New customer created:', response);
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
      handleCloseCreateCustomerModal();
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  useEffect(() => {
    async function fetchCompanyChoices() {
      try {
        const response = await api.get('companies');
        setCompanyChoices(response);
      } catch (error) {
        console.error('Error fetching clients:', error)
      }
    }

    fetchCompanyChoices();

  }, []);


  useEffect(() => {
    // Mettre à jour le numéro du client uniquement lorsque les données des clients existants sont disponibles
    if (customers.length > 0) {
      setCustomerData(prevData => ({
        ...prevData,
        customer_number: 'C' + String(customers.length + 1).padStart(3, '0')
      }));
    }
  }, [customers]); // L'effet se déclenche lorsque les données des clients existants sont mises à jour

  return (
    <div style={styles.containerMain}>
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
            name="customer_address.road"
            value={customerData.customer_address.road}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="number">Numéro:</label>
          <input
            type="text"
            id="number"
            name="customer_address.number"
            value={customerData.customer_address.number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="extra_info">Information supplémentaire:</label>
          <input
            type="text"
            id="extra_info"
            name="customer_address.extra_info"
            value={customerData.customer_address.extra_info}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="postal_code">Code postal:</label>
          <input
            type="text"
            id="postal_code"
            name="customer_address.postal_code"
            value={customerData.customer_address.postal_code}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="city">Ville:</label>
          <input
            type="text"
            id="city"
            name="customer_address.city"
            value={customerData.customer_address.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="country">Pays:</label>
          <input
            type="text"
            id="country"
            name="customer_address.country"
            value={customerData.customer_address.country}
            onChange={handleChange}
          />
        </div>
        <div>
        <label htmlFor="country">Ce client appartient à l'entreprise:</label>
          <select name="company" value={customerData.company} onChange={handleChange}>
            <option value="">Sélectionnez une entreprise</option>
            {companyChoices.map(company => (
              <option key={company._id} value={company._id}>{company.companyName}</option>
            ))}
          </select>
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
        <span id="cancel_btn" style={{ cursor: "pointer" }} onClick={handleCancel}>Annuler</span>
      </form>

    </div>
  );
}

const styles = {
  containerMain: {
    backgroundImage: 'linear-gradient(rgb(214, 234, 255), rgb(204, 229, 255))',
    paddingBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
};

export default CreateCustomer;


