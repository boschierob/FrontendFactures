import React, { useState, useEffect } from 'react';

function EditFormModal({ customer, closeModal }) {
  // État local pour les prestations
  const [prestations, setPrestations] = useState([]);
  // État local pour les nouvelles prestations
  const [newPrestation, setNewPrestation] = useState({
    description: '',
    unit_price: '',
    unit_type: '',
    interventions: []
  });
  // État local pour la liste des interventions
  const [interventions, setInterventions] = useState([{ date: '', qty_unit: '' }]);
  
  // Gestionnaire d'événements pour ajouter une prestation
  const handleAddPrestation = () => {
    if (newPrestation.description.trim() !== '' && newPrestation.unit_price.trim() !== '' && newPrestation.unit_type.trim() !== '') {
      setPrestations([...prestations, {...newPrestation, interventions: interventions}]);
      setNewPrestation({
        description: '',
        unit_price: '',
        unit_type: '',
        interventions: []
      });
      setInterventions([{ date: '', qty_unit: '' }]); // Réinitialiser les interventions
    }
  };

  // Gestionnaire d'événements pour ajouter une intervention
  const handleAddIntervention = () => {
    setInterventions([...interventions, { date: '', qty_unit: '' }]);
  };

  // Gestionnaire d'événements pour soumettre le formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implémentez ici la logique pour soumettre les prestations du client
    console.log('Prestations ajoutées:', prestations);
    localStorage.setItem('prestations', JSON.stringify(prestations));
    closeModal();
  };

  useEffect(() => {
    const storedPrestations = localStorage.getItem('prestations');
    if (storedPrestations) {
      setPrestations(JSON.parse(storedPrestations));
    }
  }, []);

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
              onChange={(e) => setNewPrestation({...newPrestation, description: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="unit_price">Prix unitaire:</label>
            <input
              type="number"
              id="unit_price"
              value={newPrestation.unit_price}
              onChange={(e) => setNewPrestation({...newPrestation, unit_price: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="unit_type">Type d'unité:</label>
            <input
              type="text"
              id="unit_type"
              value={newPrestation.unit_type}
              onChange={(e) => setNewPrestation({...newPrestation, unit_type: e.target.value})}
            />
          </div>
          <div>
            {interventions.map((intervention, index) => (
              <div key={index}>
                <label>Date d'intervention:</label>
                <input
                  type="date"
                  value={intervention.date}
                  onChange={(e) => {
                    const newInterventions = [...interventions];
                    newInterventions[index].date = e.target.value;
                    setInterventions(newInterventions);
                  }}
                />
                <label>Quantité d'heures:</label>
                <input
                  type="number"
                  value={intervention.qty_unit}
                  onChange={(e) => {
                    const newInterventions = [...interventions];
                    newInterventions[index].qty_unit = e.target.value;
                    setInterventions(newInterventions);
                  }}
                />
              </div>
            ))}
          </div>
          <button type="button" onClick={handleAddIntervention}>+</button>
          <button type="button" onClick={handleAddPrestation}>Valider les dates</button>
          <div>
            <h3>Prestations:</h3>
            <ol>
              {prestations.map((prestation, index) => (
                <li key={index}>
                  {prestation.description} - {prestation.unit_price} - {prestation.unit_type}
                  <ul>
                    {prestation.interventions.map((intervention, subIndex) => (
                      <li key={subIndex}>{intervention.date} - {intervention.qty_unit} heures</li>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', /* Fond semi-transparent */
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
