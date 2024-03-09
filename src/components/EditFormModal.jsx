import React, { useState, useEffect } from 'react';
import { AiOutlineCheck } from "react-icons/ai";
import { IoIosTime } from "react-icons/io";

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
  const filteredPrestations = prestations.filter(prestation => prestation.customerId === customer._id)

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedPrestations = prestations.map(prestation => {
      if (prestation.customerId === customer._id) {
        console.log('prestation.interventions '+ JSON.stringify(prestation.interventions));
        console.log('interventions '+ JSON.stringify(interventions));
        console.log('prestation.interventions.concat(interventions) ' + JSON.stringify(prestation.interventions.concat(interventions)));
        const updatedInterventions = interventions.length > 0 && interventions.every(intervention => intervention.date.trim() !== '' && intervention.qty_unit.trim() !== '')
        ? prestation.interventions.concat(interventions)
        : prestation.interventions;
               return {
          ...prestation,
          interventions: updatedInterventions
        };
      }
      return prestation;
    });
    console.log('updatedPrestations', updatedPrestations);
    setPrestations(updatedPrestations);
    localStorage.setItem('prestations', JSON.stringify(updatedPrestations));
    closeModal();
  };

  useEffect(() => {
    const storedPrestations = localStorage.getItem('prestations');
    if (storedPrestations) {
      setPrestations(JSON.parse(storedPrestations));
    }
  }, [customer._id]);

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
              {filteredPrestations.map((prestation, index) => (
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
