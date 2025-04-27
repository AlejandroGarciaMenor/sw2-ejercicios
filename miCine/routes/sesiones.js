// rutas/sesiones.js
const express = require('express');
const router = express.Router({ mergeParams: true }); // Importante para recoger el id de película
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;
const MAX_RESULTS = parseInt(process.env.MAX_RESULTS);
const COLLECTION = "sesiones";

// GET /peliculas/:id/sesiones - Obtener todas las sesiones de una película
router.get('/', (req, res) => {
  const { id } = req.params;
  // TODO: buscar sesiones por id de película
  res.status(200).json({ message: `Obtener sesiones de la película ${id}` });
});

// POST /peliculas/:id/sesiones - Crear nueva sesión para una película
router.post('/', async (req, res) => {
    const dbConnect = dbo.getDb();
    const { id } = req.params;
    const sesionData = req.body;
    if (!sesionData.hora || !sesionData.sala || !sesionData.fecha || sesionData.asientosDisponibles <= 0) {
        return res.status(400).json({ error: 'Faltan datos obligatorios para crear la sesión' });
    }
    const nuevaSesion = {
        idPelicula: id,
        hora: sesionData.hora,
        sala: sesionData.sala,
        fecha: sesionData.fecha,
        asientosDisponibles: sesionData.asientosDisponibles,
    };
        let result = await dbConnect
            .collection(COLLECTION)
            .insertOne(nuevaSesion);
        res.status(201).send(result);
});

// GET /peliculas/:id/sesiones/:idSesion - Obtener información de una sesión
router.get('/:idSesion', (req, res) => {
  const { id, idSesion } = req.params;
  // TODO: buscar sesión por id de película y id de sesión
  res.status(200).json({ message: `Obtener sesión ${idSesion} de la película ${id}` });
});

// PUT /peliculas/:id/sesiones/:idSesion - Editar una sesión
router.put('/:idSesion', (req, res) => {
  const { id, idSesion } = req.params;
  const updatedData = req.body;
  // TODO: actualizar sesión
  res.status(200).json({ message: `Actualizar sesión ${idSesion} de la película ${id}`, updatedData });
});

// DELETE /peliculas/:id/sesiones/:idSesion - Eliminar una sesión
router.delete('/:idSesion', (req, res) => {
  const { id, idSesion } = req.params;
  // TODO: eliminar sesión
  res.status(200).json({ message: `Eliminar sesión ${idSesion} de la película ${id}` });
});

module.exports = router;
