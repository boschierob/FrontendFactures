import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';


const CompanyContext = createContext();

export const useCompany = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState(null);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Utilisation de votre service api pour charger les companies
    const fetchCompanies = async () => {
      try {
        const data = await api.get('companies'); // Utilisez 'companies' comme endpoint
        setCompanies(data);
      } catch (error) {
        console.error("Erreur lors du chargement des companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const switchCompany = (companyId) => {
    const newCompany = companies.find(c => c._id === companyId);
    setCompany(newCompany);
  };

  const updateCompaniesList = (newCompanies) => {
    setCompanies(newCompanies);
  };

  return (
    <CompanyContext.Provider value={{ company, companies, switchCompany, updateCompaniesList }}>
      {children}
    </CompanyContext.Provider>
  );
};
