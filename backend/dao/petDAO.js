const db = require('../config/db');

exports.listarTodos = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM pets', (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.criarPet = (pet) => {
    const { id, name, breed, type_of_animal, description, adopted, gender, image_of_animal, age } = pet;
    const query = `
    INSERT INTO pets (id, name, breed, type_of_animal, description, adopted, gender, image_of_animal, age) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
        db.query(query, [id, name, breed, type_of_animal, description, adopted, gender, image_of_animal, age], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.atualizarPet = (id, pet) => {
    const { name, breed, type_of_animal, description, adopted, gender, image_of_animal, age } = pet;
    const query = `
    UPDATE pets SET name = ?, breed = ?, type_of_animal = ?, description = ?, adopted = ?, gender = ?, image_of_animal = ?, age = ? 
    WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.query(query, [name, breed, type_of_animal, description, adopted, gender, image_of_animal, age, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.deletarPet = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM pets WHERE id = ?', [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.buscarPorId = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM pets WHERE id = ?', [id], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
        });
    });
};

exports.buscarTipos = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT DISTINCT type_of_animal FROM pets', (err, result) => {
            if (err) return reject(err);
            resolve(result.map(r => r.type_of_animal));
        });
    });
};

exports.buscarGeneros = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT DISTINCT gender FROM pets', (err, result) => {
            if (err) return reject(err);
            resolve(result.map(r => r.gender));
        });
    });
};

exports.buscarRacasPorTipo = (tipos) => {
    const placeholders = tipos.map(() => '?').join(',');
    const query = `SELECT DISTINCT breed FROM pets WHERE type_of_animal IN (${placeholders})`;

    return new Promise((resolve, reject) => {
        db.query(query, tipos, (err, result) => {
            if (err) return reject(err);
            resolve(result.map(r => r.breed));
        });
    });
};
