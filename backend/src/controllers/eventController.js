const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/events — Lista todos os eventos
const getAllEvents = async (req, res, next) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' },
      include: {
        _count: { select: { registrations: true } },
      },
    });
    res.json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
};

// GET /api/events/:id — Detalhes de um evento com lista de participantes
const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: {
        registrations: {
          orderBy: { createdAt: 'desc' },
          select: { id: true, name: true, email: true, createdAt: true },
        },
        _count: { select: { registrations: true } },
      },
    });

    if (!event) {
      return res.status(404).json({ success: false, message: 'Evento não encontrado.' });
    }

    res.json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

// POST /api/events — Cria um novo evento
const createEvent = async (req, res, next) => {
  try {
    const { name, date, location, description, maxAttendees, imageUrl } = req.body;

    if (!name || !date || !location || !description || !maxAttendees) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos obrigatórios devem ser preenchidos.',
      });
    }

    if (maxAttendees < 1) {
      return res.status(400).json({
        success: false,
        message: 'O número máximo de participantes deve ser pelo menos 1.',
      });
    }

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Data e hora inválidas.',
      });
    }

    const event = await prisma.event.create({
      data: {
        name,
        date: parsedDate,
        location,
        description,
        maxAttendees: parseInt(maxAttendees),
        imageUrl: imageUrl || null,
      },
    });

    res.status(201).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllEvents, getEventById, createEvent };