import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft, Plus } from 'lucide-react';
import axios from 'axios';

import '../css/RegisterPet.css';

const RegisterPet = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    age: '', name: '', breed: '', type_of_animal: '',
    description: '', adopted: '', gender: '', image_of_animal: ''
  });

  // [age ,name, breed, type_of_animal, description, adopted, gender, image_of_animal, id]

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/pets', form);
      alert('Animal cadastrado com sucesso!');
      setForm({
        name: '', age: '', gender: '', breed: '',
        type_of_animal: '', adopted: '', description: '', image_of_animal: '',
      });
    } catch (err) {
      alert('Erro ao cadastrar o animal');
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <button onClick={() => navigate('/')} className="btn btn-home">
        <ArrowBigLeft className="arrow-left-register" /> Voltar para Home
      </button>

      <h1 className="register-title">Cadastro de animal</h1>

      <form className="register-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Informações Básicas</legend>
          <input type="text" name="name" placeholder="Nome" value={form.name} onChange={handleChange} required />
          <input type="number" name="age" placeholder="Idade" value={form.age} onChange={handleChange} required />
          <select name="gender" value={form.gender} onChange={handleChange} required>
            <option value="">Selecione o sexo</option>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>
          <select name="adopted" value={form.adopted} onChange={handleChange} required>
            <option value="">Disponibilidade para adoção</option>
            <option value="true">Adotado</option>
            <option value="false">Disponível</option>
          </select>
          <input type="text" name="breed" placeholder="Raça" value={form.breed} onChange={handleChange} required />
          <input type="text" name="type_of_animal" placeholder="Espécie do animal Ex: cão, gato..." value={form.type_of_animal} onChange={handleChange} required />
          <input type="text" name="image_of_animal" placeholder="Imagem do animal (URL)" value={form.image_of_animal} onChange={handleChange} required />
        </fieldset>

        <fieldset>
          <legend>Descrição </legend>
          <textarea name="description" placeholder="Alguma anotação sobre o animal" value={form.description} onChange={handleChange}></textarea>
        </fieldset>

        <button type="submit" className="btn btn-submit">Cadastrar Animal <Plus size={20}/></button>
      </form>
    </div>
  );
};

export default RegisterPet;
