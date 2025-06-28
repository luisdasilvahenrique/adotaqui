import '../css/ModalEditPet.css';
import { useState } from 'react';

export default function ModalEditPet({ pet, onClose }) {
  const [formData, setFormData] = useState({ ...pet });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/pets/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          age: formData.age,
          breed: formData.breed,
          type_of_animal: formData.type_of_animal,
          description: formData.description,
          adopted: formData.adopted,
          gender: formData.gender,
          image_of_animal: formData.image_of_animal,
          id: formData.id
        })
      });
      if (res.status === 200) {
        alert('Pet atualizado com sucesso!✅');
        onClose();
      } else {
        alert('Erro ao atualizar o pet. ❌');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão 🌐');
    }
  };

  // [age ,name, breed, type_of_animal, description, adopted, gender, image_of_animal, id]

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2 className='modal-title'>Editar Pet</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome</label>
          <input class = ".input" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <label>Idade</label>
          <input class = ".input" type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
          <label>Tipo de Animal</label>
          <input class = ".input" type="text" value={formData.type_of_animal} onChange={(e) => setFormData({ ...formData, type_of_animal: e.target.value })} />
          <label>Descrição</label>
          <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
          <label>Gênero</label>
          <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>
          <label>Imagem do Animal</label>
          <input class = ".input" type="text" value={formData.image_of_animal} onChange={(e) => setFormData({ ...formData, image_of_animal: e.target.value })} />
          <img src={formData.image_of_animal} alt="Pet" className="pet-image" />
          <br />
          <label>Raça</label>
          <input class = ".input" type="text" value={formData.breed} onChange={(e) => setFormData({ ...formData, breed: e.target.value })} />
          <label>Status</label>
          <select value={formData.adopted ? 'Adotado' : 'Disponível'} onChange={(e) => setFormData({ ...formData, adopted: e.target.value === 'Adotado' })}>
            <option value="Disponível">Disponível</option>
            <option value="Adotado">Adotado</option>
          </select>
          <button type="submit" className="btn btn-save">Salvar</button>
        </form>
      </div>
    </div>
  );
}
