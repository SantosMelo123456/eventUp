const express = require('express');
const router = express.Router();
const { getAllEvents, getEventById, createEvent } = require('../controllers/eventController');

// GET /api/events — lista todos os eventos
router.get('/', getAllEvents);

// GET /api/events/:id — detalhes de um evento específico
router.get('/:id', getEventById);

// POST /api/events — cria um novo evento
router.post('/', createEvent);

module.exports = router;