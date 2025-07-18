const petDAO = require('../dao/petDAO');

exports.listPets = async (req, res) => {
    try {
        const pets = await petDAO.listarTodos();
        res.json(pets);
    } catch (error) {
        console.error('Erro ao buscar os pets:', error);
        res.status(500).json({ error: 'Erro ao buscar os pets' });
    }
};

exports.createPet = async (req, res) => {
    try {
        await petDAO.criarPet(req.body);
        res.status(201).json({ message: 'Pet cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar o pet:', error);
        res.status(500).json({ error: 'Erro ao cadastrar o pet' });
    }
};

exports.updatePet = async (req, res) => {
    try {
        const { id } = req.params;
        await petDAO.atualizarPet(id, req.body);
        res.json({ message: 'Pet atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar o pet:', error);
        res.status(500).json({ error: 'Erro ao atualizar o pet' });
    }
};

exports.deletePet = async (req, res) => {
    try {
        const { id } = req.params;
        await petDAO.deletarPet(id);
        res.json({ message: 'Pet deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar o pet:', error);
        res.status(500).json({ error: 'Erro ao deletar o pet' });
    }
};

exports.getPetById = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await petDAO.buscarPorId(id);

        if (!pet) {
            return res.status(404).json({ error: 'Pet não encontrado' });
        }

        res.json(pet);
    } catch (error) {
        console.error('Erro ao buscar o pet:', error);
        res.status(500).json({ error: 'Erro ao buscar o pet' });
    }
};

exports.getTypes = async (req, res) => {
    try {
        const tipos = await petDAO.buscarTipos();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar tipos' });
    }
};

exports.getGenders = async (req, res) => {
    try {
        const generos = await petDAO.buscarGeneros();
        res.json(generos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar gêneros' });
    }
};

exports.getBreeds = async (req, res) => {
    const { type_of_animal } = req.body;

    if (!type_of_animal || type_of_animal.length === 0) return res.json([]);

    try {
        const racas = await petDAO.buscarRacasPorTipo(type_of_animal);
        res.json(racas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar raças' });
    }
};
