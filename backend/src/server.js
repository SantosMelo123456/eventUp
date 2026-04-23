const express = require('express'); // importa express - framework que cria o servidor e gerencia rotas
const cors = require('cors'); // importa o cors - permite que o frontend (em outra porta) acesse o backend, sem isso o navegador bloqueia.
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes'); // Importa os arquivos de rotas criados — um pra eventos, outro pra inscrições.
const errorHandler = require('./middleware/errorHandler'); // Importa o middleware que captura erros de qualquer rota.
const app = express(); // Cria a aplicação Express — é o servidor.
const PORT = process.env.PORT || 3001; // Define a porta, sendo Railway ele define automaticamente via process.env.PORT, localmente usa 3001.

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})); 
// Configura o CORS, ele aceita requisições HTTP do frontend. 
// o * significa qualquer origem (bom pra desenvolvimento)

app.use(express.json());
// Faz o Express conseguir ler o corpo das requisições em JSON — sem isso o req.body vem vazio.

app.use('/api/events', eventRoutes);
app.use('/api/events', registrationRoutes);
// Registra as rotas. Tudo que chegar em /api/events vai ser direcionado pra esses arquivos.

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' });
});
// Uma rota simples pra verificar se o servidor está no ar e é útil no Railway pra saber se o deploy funcionou.

app.use(errorHandler);
//Registra o middleware de erros, tem que ser o último app.use().

app.listen(PORT, () => {
  console.log(` Servidor running na porta ${PORT}`);
});
//Coloca o servidor pra escutar na porta definida (3001). Quando rodar node src/server.js (localização desse código) vai aparecer essa mensagem no terminal.