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
    },
    async put(endpoint, data) {
      console.log('data in the service api to send :'+JSON.stringify(data));
      console.log('endpoint '+ endpoint);
      try {
        const response = await fetch(`http://localhost:3000/${endpoint}`, {
          method: 'PUT',
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
    },
    async delete(endpoint) {
      console.log('endpoint for delete: ' + endpoint);
      try {
        const response = await fetch(`http://localhost:3000/${endpoint}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
          // Pas de body pour une requête DELETE dans cet exemple
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        return await response.json(); // ou response.text() si la réponse n'est pas du JSON
      } catch (error) {
        console.error('Erreur de fetch:', error);
        throw error;
      }
    }
  };
  
  export default api;
  