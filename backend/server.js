const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rotas
const petRoutes = require('./routes/petRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/pets', petRoutes);
app.use('/adm', authRoutes);

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001!🚀');
});
