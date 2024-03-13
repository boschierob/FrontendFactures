// CompanySelector.js
import React from 'react';
import { useCompany } from '../context/CompanyContext';

const CompanySelector = () => {
  const { companies, switchCompany } = useCompany();

  // Cette fonction est appelée lorsque l'utilisateur sélectionne une nouvelle company
  const handleCompanyChange = (event) => {
    const companyId = event.target.value;
    switchCompany(companyId); // Met à jour la company actuellement sélectionnée
  };

  return (
    <select onChange={handleCompanyChange} defaultValue="">
      <option value="" disabled>Choisir une company</option>
      {companies.map((company) => (
        <option key={company._id} value={company._id}>{company.companyName}</option>
      ))}
    </select>
  );
};

export default CompanySelector;
