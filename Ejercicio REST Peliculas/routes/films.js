const express = require('express');
const router = express.Router();

let films = [
    {
        id: 1,
        titulo: "Inception",
        año: 2010,
        directores: ["Christopher Nolan"],
        generos: ["Ciencia ficción"],
        minutos: 148,
        puntuacion: 8.8,
        actores: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
        presupuesto: 160000000,
        descripcion: "Un ladrón que roba secretos corporativos a través del uso de la tecnología de sueños comparte una misión imposible.",
        idioma: "Inglés",
        beneficios: 829895144,
        premios: [{ año: 2011, titulo: "Oscar", ganado: true, categoria: "Mejores efectos visuales" }]
    },
    {
        id: 2,
        titulo: "The Shawshank Redemption",
        año: 1994,
        directores: ["Frank Darabont"],
        generos: ["Drama"],
        minutos: 142,
        puntuacion: 9.3,
        actores: ["Tim Robbins", "Morgan Freeman"],
        presupuesto: 25000000,
        descripcion: "Two imprisoned guys bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        idioma: "Inglés",
        beneficios: 28341469,
        premios: [{ año: 1995, titulo: "Oscar", ganado: false, categoria: "Mejor película" }]
    }
];

router.get('/', (req, res) => {
    res.json(films);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const film = films.find(f => f.id === id);
    if (film) {
        res.json(film);
    } else {
        res.status(404).send('Película no encontrada');
    }
});

router.post('/', (req, res) => {
    const film = req.body;
    film.id = films.length + 1;
    films.push(film);
    res.status(201).json(film);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const film = films.find(f => f.id === id);
    if (film) {
        const index = films.indexOf(film);
        films[index] = req.body;
        films[index].id = id;
        res.json(films[index]);
    } else {
        res.status(404).send('Película no encontrada');
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const film = films.find(f => f.id === id);
    if (film) {
        films = films.filter(f => f.id !== id);
        res.status(200).send('Película eliminada');
    } else {
        res.status(404).send('Película no encontrada');
    }
});

module.exports = router;