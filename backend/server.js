const express = require('express');
const cors = require('cors');
const mySql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

const dataBase = mySql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'adotaqui'
});

// Teste de conexão com o banco de dados

dataBase.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:😔', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso!🛜');
    }
);

// Rota para listar todos os pets
app.get('/pets', (req, res) => {
  const sql = 'SELECT * FROM pets';
  dataBase.query(sql, (err, result) => {
    if (err) {
      console.error('Erro ao buscar os pets:', err);
      return res.status(500).json({ error: 'Erro ao buscar os pets' });
    }
    res.json(result);
  });
});

// Rota para cadastra um novo pet
app.post('/pets', (req, res) => {
  const { id, name, breed, type_of_animal, description ,adopted } = req.body;
  const sql = 'INSERT INTO pets (id, name_animal, breed, type_of_animal, description, adopted) VALUES (?, ?, ?, ?, ?, ?)';
  dataBase.query(sql, [id, name, breed, type_of_animal, description, adopted], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar o pet:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar o pet' });
    }
    result.status(201).json({ message: 'Pet cadastrado com sucesso!' });
  });
});

// Outras rotas podem ser adicionadas aqui




// Iniciar servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001!🚀');
});



