const authDAO = require('../dao/authDAO');

exports.login = async (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.status(400).json({ mensagem: 'Usuário e senha são obrigatórios' });
    }

    try {
        const usuarioEncontrado = await authDAO.buscarUsuario(usuario);

        if (!usuarioEncontrado || usuarioEncontrado.senha !== senha) {
            return res.status(401).json({ mensagem: 'Usuário não encontrado ou senha incorreta' });
        }

        res.status(200).json({ mensagem: 'Login autorizado' });
    } catch (error) {
        console.error('Erro na autenticação:', error);
        res.status(500).json({ erro: 'Erro no servidor' });
    }
};
