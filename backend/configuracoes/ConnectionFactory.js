const mySql = require('mysql');

function connectionDB(){
const connectionDB = mySql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', //o meu foi mudado o password
  database: 'adotaqui'
});

connectionDB.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados: 😔', err);
      return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso! 🛜');
  });

return connectionDB;
}



module.exports = { connectionDB }; 