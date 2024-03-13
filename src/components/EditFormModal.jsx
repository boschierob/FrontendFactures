import React, { useState, useEffect } from 'react';
import { AiOutlineCheck } from "react-icons/ai";
import { IoIosTime } from "react-icons/io";
import api from '../services/api';


function EditFormModal({ customer, closeModal }) {
  const [prestations, setPrestations] = useState([]);
  const [newPrestation, setNewPrestation] = useState({
    customerId: customer.id,
    description: '',
    unit_price: '',
    unit_type: '',
    interventions: []
  });
  const [interventions, setInterventions] = useState([{ date: '', qty_unit: '' }]);

  const handleAddPrestation = () => {
    if (newPrestation.description.trim() !== '' && newPrestation.unit_price.trim() !== '' && newPrestation.unit_type.trim() !== '') {
      const prestationWithInterventions = {
        ...newPrestation,
        customerId: customer._id,
        interventions: interventions
      };
      setPrestations([...prestations, prestationWithInterventions]);
      setNewPrestation({
        ...newPrestation,
        description: '',
        unit_price: '',
        unit_type: ''
      });
      setInterventions([{ date: '', qty_unit: '' }]);
    }
  };

  const handleAddIntervention = () => {
    setInterventions([...interventions, { date: '', qty_unit: '' }]);
  };

  const handleInterventionChange = (index, field, value) => {
    const newInterventions = [...interventions];
    newInterventions[index][field] = value;
    setInterventions(newInterventions);
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  // Supprimer la clé "customerId" de chaque objet prestation
  const updatedPrestationsWithoutCustomerId = prestations.map(prestation => {
    const { customerId, ...rest } = prestation;
    return rest;
  });

  // Convertir les valeurs des prix et des quantités en nombres
  const updatedPrestationsFormatted = updatedPrestationsWithoutCustomerId.map(prestation => ({
    ...prestation,
    unit_price: Number(prestation.unit_price),
    interventions: prestation.interventions.map(intervention => ({
      ...intervention,
      qty_unit: Number(intervention.qty_unit)
    }))
  }));

  try {
    const response = await api.put(`customers/${customer._id}`, { prestations: updatedPrestationsFormatted });
    console.log('RESPONSE ' +JSON.stringify(response)); 
    if (!response.status === 201) {
      throw new Error('Erreur lors de la mise à jour des prestations');
    }

    alert(response.message);
    closeModal();
  } catch (error) {
    console.error('Erreur lors de la mise à jour des prestations:', error);
    // Gérer les erreurs ici
  }
};

  

useEffect(() => {
  if (customer.prestations) {
    setPrestations(customer.prestations);
  } else {
    // Si customer.prestations n'existe pas, définissez prestations sur un tableau vide
    setPrestations([]);
  }
  
}, [customer._id, customer.prestations]); 

  return (
    <div className="modal-container" style={styles.modalContainer}>
      <div className="modal-content" style={styles.modalContent}>
        <h2>Ajouter des prestations pour {customer.customer_firstname} {customer.customer_lastname}</h2>
        <em>id du client : {customer._id}</em>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={newPrestation.description}
              onChange={(e) => setNewPrestation({ ...newPrestation, description: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="unit_price">Prix unitaire:</label>
            <input
              type="number"
              id="unit_price"
              value={newPrestation.unit_price}
              onChange={(e) => setNewPrestation({ ...newPrestation, unit_price: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="unit_type">Type d'unité:</label>
            <select
              id="unit_type"
              value={newPrestation.unit_type}
              onChange={(e) => setNewPrestation({ ...newPrestation, unit_type: e.target.value })}>
              <option value="hour">Heure</option>
              <option value="forfait">Forfait</option>
              <option value="day">Jour</option>
            </select>
          </div>
          <div>
            {interventions.map((intervention, index) => (
              <div key={index}>
                <label>Date d'intervention:</label>
                <input
                  type="date"
                  value={intervention.date}
                  onChange={(e) => handleInterventionChange(index, 'date', e.target.value)}
                />
                <label>Quantité :</label>
                <input
                  type="number"
                  value={intervention.qty_unit}
                  onChange={(e) => handleInterventionChange(index, 'qty_unit', e.target.value)}
                />
              </div>
            ))}
          </div>
          <button type="button" onClick={handleAddIntervention}>+</button>
          <button type="button" onClick={() => handleAddPrestation(customer._id)}>Valider les dates</button>
          <div>
            <h3>Prestations:</h3>
            <ol>
              {prestations.map((prestation, index) => (
                <li style={{ margin: 'auto 20px auto auto' }} key={index}>
                  prestation de {prestation.description} à {prestation.unit_price} euros  par {prestation.unit_type}
                  <ul>
                    {prestation.interventions.map((intervention, subIndex) => (
                      <li style={{ margin: 'auto 60px auto auto' }} key={subIndex}> <AiOutlineCheck /> {intervention.date} <span><IoIosTime /> {intervention.qty_unit} {prestation.unit_type}</span> </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
          <button type="submit">Enregistrer</button>
        </form>
        <button onClick={closeModal} style={styles.closeModalButton}>Annuler</button>
      </div>
    </div>
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
  }
};

export default EditFormModal;
