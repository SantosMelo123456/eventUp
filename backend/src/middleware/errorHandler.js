const errorHandler = (err, req, res, next) => {
  console.error('Erro:', err.message);

  // Erro do Prisma: banco de dados indisponível/inacessível
  if (err.code === 'P1001') {
    return res.status(503).json({
      success: false,
      message: 'Não foi possível conectar ao banco de dados. Verifique o PostgreSQL e a DATABASE_URL.',
    });
  }

  // Erro do Prisma: dado duplicado (ex: e-mail já cadastrado)
  if (err.code === 'P2002') {
    return res.status(400).json({ success: false, message: 'Dados duplicados.' });
  }

  // Erro genérico do servidor
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor. Tente novamente.',
  });
};

module.exports = errorHandler;