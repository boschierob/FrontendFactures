// src/services/api.js

const api = {
    async get(endpoint) {
      try {
        const response = await fetch(`http://localhost:3000/${endpoint}`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Erreur de fetch:', error);
        throw error;
      }
    },
    async post(endpoint, data) {
      console.log('enter frontend to api');
      try {
        const response = await fetch(`http://localhost:3000/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Erreur de fetch:', error);
        throw error;
      }
    }
  };
  
  export default api;
  