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
  const { id, name, breed, type_of_animal, description ,adopted, gender, image_of_animal, age } = req.body;
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

// [age ,name, breed, type_of_animal, description, adopted, gender, image_of_animal, id]

// Iniciar servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001!🚀');
});



