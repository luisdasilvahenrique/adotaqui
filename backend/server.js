const express = require('express');
const cors = require('cors');
const mySql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();

const dataBase = mySql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});
dataBase.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:😔', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida com sucesso!🛜');
}
);

// Rota para autenticação do administrador
app.post('/adm', (req, res) => {
  const { usuario, senha } = req.body;
  if (!usuario || !senha) {
    return res.status(400).json({ mensagem: 'Usuário e senha são obrigatórios' });
  }

  dataBase.query('SELECT * FROM adm WHERE usuario = ?', [usuario], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro no servidor' });

    if (result.length === 0) {
      return res.status(404).json({ campo: 'usuario', mensagem: 'Usuário não encontrado' });
    }

    result = result[0];
    const senhaCorreta = result.senha === senha;
    if (!senhaCorreta) {
      return res.status(401).json({ campo: 'senha', mensagem: 'Senha incorreta' });
    }

    res.status(200).json({ mensagem: 'Login autorizado' });
  });
});


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
  const { id, name, breed, type_of_animal, description, adopted, gender, image_of_animal, age } = req.body;
  const sql = 'INSERT INTO pets (id, name, breed, type_of_animal, description, adopted, gender, image_of_animal, age) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  dataBase.query(sql, [id, name, breed, type_of_animal, description, adopted, gender, image_of_animal, age], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar o pet:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar o pet' });
    }
    res.status(201).json({ message: 'Pet cadastrado com sucesso!' });
  });
});

// Rota para atualizar um pet
app.put('/pets/:id', (req, res) => {
  const { id } = req.params;
  const { name, breed, type_of_animal, description, adopted, gender, image_of_animal, age } = req.body;
  const sql = 'UPDATE pets SET name = ?, breed = ?, type_of_animal = ?, description = ?, adopted = ?, gender = ?, image_of_animal = ?, age = ? WHERE id = ?';
  dataBase.query(sql, [name, breed, type_of_animal, description, adopted, gender, image_of_animal, age, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar o pet:', err);
      return res.status(500).json({ error: 'Erro ao atualizar o pet' });
    }
    res.json({ message: 'Pet atualizado com sucesso!' });
  });
  console.log(req.body);
});

// Rota para deletar um pet
app.delete('/pets/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM pets WHERE id = ?';
  dataBase.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar o pet:', err);
      return res.status(500).json({ error: 'Erro ao deletar o pet' });
    }
    res.json({ message: 'Pet deletado com sucesso!' });
  });
});

// Rota para mostrar os detalhes de um pet específico
app.get('/pets/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM pets WHERE id = ?';
  dataBase.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao buscar o pet:', err);
      return res.status(500).json({ error: 'Erro ao buscar o pet' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }
    res.json(result[0]);
  });
});

// Rota para buscar os filtros de espécies

// GET todos os tipos distintos
app.get('/pets/filters/types', (req, res) => {
  const sql = 'SELECT DISTINCT type_of_animal FROM pets';
  dataBase.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar tipos' });
    res.json(result.map(r => r.type_of_animal));
  });
});

// GET todos os gêneros distintos
app.get('/pets/filters/genders', (req, res) => {
  const sql = 'SELECT DISTINCT gender FROM pets';
  dataBase.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar gêneros' });
    res.json(result.map(r => r.gender));

  });
});

// POST raças conforme espécies selecionadas
app.post('/pets/filters/breeds', (req, res) => {
  const { type_of_animal } = req.body;
  if (!type_of_animal || type_of_animal.length === 0) return res.json([]);

  const placeholders = type_of_animal.map(() => '?').join(',');
  const sql = `SELECT DISTINCT breed FROM pets WHERE type_of_animal IN (${placeholders})`;

  dataBase.query(sql, type_of_animal, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar raças' });
    res.json(result.map(r => r.breed));
  });
});

// [age ,name, breed, type_of_animal, description, adopted, gender, image_of_animal, id]

// Iniciar servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001!🚀');
});