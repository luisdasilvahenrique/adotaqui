const express = require('express');
const cors = require('cors');
const mySql = require('mysql');

const DB = require('./configuracoes/ConnectionFactory'); // importa a conexão com o banco de dados

const app = express();
app.use(cors());
app.use(express.json());

const db = DB.connectionDB();

// Rota para autorizar o usuario
app.post('/adm', (req, res) => {
  const usuario = req.body.usuario;
  const senha = req.body.senha;

  db.query('SELECT * FROM adm WHERE usuario = ?', [usuario], (err, result) => {
    if(err) return res.status(500).json({ erro: 'Erro no servidor' });

    if (result.length === 0) {
      return res.status(404).json({ campo: 'usuario', mensagem: 'Usuário não encontrado' });
    }

    result = result[0];//do banco de dados
    const senhaCorreta = result.senha === senha; 
     if (!senhaCorreta) {
      // Usuário existe mas senha não bate ➜ 401
      return res.status(401).json({ campo: 'senha', mensagem: 'Senha incorreta' });
    }

    res.status(200).json({ mensagem : 'Login autorizado' });
  })



});


// Rota para listar todos os pets
app.get('/pets', (req, res) => {
  const sql = 'SELECT * FROM pets';
  db.query(sql, (err, result) => {
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
  db.query(sql, [id, name, breed, type_of_animal, description, adopted, gender, image_of_animal, age], (err, result) => {
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
  db.query(sql, [name, breed, type_of_animal, description, adopted, gender, image_of_animal, age, id], (err, result) => {
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
  db.query(sql, [id], (err, result) => {
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



