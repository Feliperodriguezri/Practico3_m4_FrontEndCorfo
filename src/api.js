// src/api.js
import data from './assets/data/data.json'; // Asegúrate que esta ruta es correcta

async function fetchData(endpoint) {
    return new Promise((resolve, reject) => {
        if (endpoint === 'equipoMedico') {
            resolve(data.equipoMedico);
        }
        if (endpoint === 'servicios') {
            resolve(data.servicios);
        }
        reject(new Error(`Invalid endpoint: ${endpoint}`));
    });
}


export default fetchData;