require('dotenv').config(); // Carga las variables de entorno
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors()); // Permite solicitudes de otros dominios
app.use(express.json()); // Permite recibir JSON en las peticiones

// Importar rutas
const filmRoutes = require('./routes/films'); // Rutas de películas

// Usar rutas
app.use('/peliculas', filmRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;