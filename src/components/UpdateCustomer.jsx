import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import api from '../services/api';


const UpdateCustomer  = ({ data, onConfirm, onCancel }) => {

const [companyDatas, setCompanyDatas] = useState('');

const companyId = data.company;

    // Fonction récursive pour traiter les objets imbriqués
  const renderData = (obj) => {
    return Object.keys(obj).map((key, index) => {
      let value = obj[key];
      // Si la clé est "id", ignorer cette valeur
      if (key === '_id' || key === '__v') {
        return null;
      }

      if (key === 'company'){
        value = companyDatas.companyName
      }

      // Si la valeur est un objet, appeler récursivement renderData
      if (typeof value === 'object' && value !== null) {
        return (
          <li key={index}>
            <strong>{key}:</strong>
            <ul>
              {renderData(value)}
            </ul>
          </li>
        );
      } else {
        // Si la valeur n'est pas un objet, l'afficher directement
        return <li key={index}><strong>{key}:</strong> {value} <button onClick={() => handleEditItem(value)}>Modifier</button></li>;
      }
    });
  };

  const handleEditItem = (item) => {
    console.log("customer to be modified : " + JSON.stringify(item));
  }

  useEffect(() => {

    async function fetchCompany(companyId) {
      try {
        const response = await api.get(`companies/${companyId}`);
        setCompanyDatas(response);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    }
   
    fetchCompany(companyId);
    console.log(companyId);
  }, []);

  return ReactDOM.createPortal(
    <div className="modal modal-container" style={styles.modalContainer}>
      <button className="btn btn-primary closeModalButton" onClick={onCancel}>X</button>
      <div className="modal-content" style={styles.modalContent}> 
        <h2>Modifier les données du client</h2>
        <ul>
        {renderData(data)}
        </ul>
        <div>
          <button onClick={onConfirm}>Confirmer les modifications</button>
          <button onClick={onCancel}>Annuler</button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

const styles = {
  modalContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Assurez-vous que le modal est bien au-dessus des autres éléments
  },
  modalContent: {
    position: 'relative', // Pour positionnement absolu du bouton close à l'intérieur
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    maxHeight: '80%', // Limite la hauteur du modal à 80% de la hauteur de l'écran
    overflowY: 'auto', // Permet le défilement vertical si le contenu dépasse
    width: '600px', // Vous pouvez ajuster la largeur selon vos besoins
  },
  closeModalButton: {
    position: 'absolute', // Positionnement absolu
    top: '100px', // Positionné en haut à droite du modal
    right: '10px',
    cursor: 'pointer',
  }
};


export default UpdateCustomer ;
