const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/events/:id/register — Inscreve um participante no evento
const registerForEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // 1. Campos obrigatórios
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Nome e e-mail são obrigatórios.',
      });
    }

    // 2. Validação de formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Formato de e-mail inválido.',
      });
    }

    // 3. Verifica se o evento existe
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: { _count: { select: { registrations: true } } },
    });

    if (!event) {
      return res.status(404).json({ success: false, message: 'Evento não encontrado.' });
    }

    // 4. Verifica se o evento está lotado
    if (event._count.registrations >= event.maxAttendees) {
      return res.status(400).json({
        success: false,
        message: 'Este evento está lotado. Não há mais vagas disponíveis.',
      });
    }

    // 5. Cria a inscrição
    const registration = await prisma.registration.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        eventId: parseInt(id),
      },
    });

    res.status(201).json({
      success: true,
      message: `Inscrição realizada com sucesso! Até lá, ${name}! `,
      data: registration,
    });
  } catch (error) {
    // P2002 = e-mail já cadastrado nesse evento
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'Este e-mail já está inscrito neste evento.',
      });
    }
    next(error);
  }
};

module.exports = { registerForEvent };