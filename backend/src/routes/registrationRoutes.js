const express = require('express');
const router = express.Router();
const { registerForEvent } = require('../controllers/registrationController');

// POST /api/events/:id/register — inscreve um participante no evento
router.post('/:id/register', registerForEvent);

module.exports = router;