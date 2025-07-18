const db = require('../config/db');

exports.buscarUsuario = (usuario) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM adm WHERE usuario = ?';
    db.query(query, [usuario], (err, result) => {
      if (err) return reject(err);
      resolve(result[0]);
    });
  });
};
