import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft, Plus } from 'lucide-react';
import axios from 'axios';

import '../css/RegisterPet.css';

const dogBreeds = [
  'Beagle',
  'Bulldog',
  'Labrador Retriever',  
  'Pastor Alemão',
  'Poodle',
  'Sem Raça Definida'
];

const catBreeds = [
  'Siamês',
  'Persa',
  'Maine Coon',
  'Bengal',
  'Sem Raça Definida',
];

const RegisterPet = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    age: '', name: '', breed: '', type_of_animal: '',
    description: '', adopted: 'false', gender: '', image_of_animal: '' //ao cadastrar ele já tem a condição de verdadeiro
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
        type_of_animal: '', adopted: 'false', description: '', image_of_animal: '',
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
          <input type="number" name="age" placeholder="Idade" value={form.age} onChange={handleChange} min="1" required />
          <select name="gender" value={form.gender} onChange={handleChange} required>
            <option value="" required>Selecione o sexo</option>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>

          {/*<select name="adopted" value={form.adopted} onChange={handleChange} required>
            <option value="">Disponibilidade para adoção</option>
            <option value="true">Adotado</option>         o sistema já coloca como disponivel
            <option value="false">Disponível</option>   
          </select>*/}
          <select name="type_of_animal" value={form.type_of_animal} onChange={handleChange} required>
            <option value="" required>Selecione o tipo de Pet</option>
            <option value="Cão">Cão</option>
            <option value="Gato">Gato</option>
          </select> {/* pra forçar ele a colocar o tipo da forma certa no banco*/}
          {form.type_of_animal === 'Cão' && (
            <select
              name="breed"
              value={form.breed}
              onChange={handleChange}
              required
            >
              <option value="">Selecione a raça</option>
              {dogBreeds.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          )}

          {form.type_of_animal === 'Gato' && (
            <select
              name="breed"
              value={form.breed}
              onChange={handleChange}
              required
            >
              <option value="">Selecione a raça</option>
              {catBreeds.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          )}
          <input type="url" name="image_of_animal" placeholder="Imagem do animal (URL)" value={form.image_of_animal} onChange={handleChange} required />
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
