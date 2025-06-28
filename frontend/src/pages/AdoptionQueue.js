import '../css/AdoptionQueue.css';

import Footer from '../components/Footer';
import ModalEditPet from '../components/ModalEditPet';

import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft, Trash2, Info, Edit2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdoptionQueue() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

<<<<<<< Updated upstream
=======
  // Função para mostrar detalhes do pet selecionado
  const handleDetailsClick = (id) => {
    try {
      const pet = pets.find(p => p.id === id);
      if (pet) {
        setSelectedPet(pet);
      }
    } catch (err) {
      console.error('Erro ao buscar detalhes do pet:', err);
    }
  }

  // Função para buscar a lista de pets
>>>>>>> Stashed changes
  const getPets = async () => {
    try {
      const response = await axios.get('http://localhost:3001/pets');
      setPets(response.data);
    } catch (error) {
      console.error('Erro ao buscar os pets:', error);
    }
  }

  const openEditModal = (pet) => {
    setSelectedPet(pet);
    setShowModal(true);
  }

  const closeModal = () => {
    setSelectedPet(null);
    setShowModal(false);
    getPets();
  };

  const openDeleteModal = (pet) => {
    setPetToDelete(pet);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <>
      <div className="adoption-container">
        <button onClick={() => navigate('/')} className="btn btn-home">
          <ArrowBigLeft className="arrow-left" /> Voltar para Home
        </button>
        <h1 className="adoption-title">Fila de Adoção</h1>

        {pets
          .filter(pet => pet.adopted === 0 && pet.interested === 1) //filtra os pets que ainda estão disponíveis para adoção
          .map((pet) => (
            <div key={pet.id} className="adoption-card">
            <img src={pet.image_of_animal} alt={pet.name} className="pet-photo" />
            <div className="pet-info">
              <h2 className="pet-name">{pet.name == null ? 'Pet sem nome' : pet.name}</h2>
              <p className="pet-detail">
                Espécie: {pet.type_of_animal} | Idade: {pet.age === 1 ? '1 ano' : `${pet.age} anos`} | Sexo: {pet.gender}
              </p>
              <p className="pet-detail">Raça: {pet.breed}</p>
              <p className="pet-status">
                Status: <strong>{pet.adopted ? 'Adotado' : 'Disponível'}</strong>
              </p>
            </div>
            <div className="action-buttons">
<<<<<<< Updated upstream
              <button className="btn btn-edit" onClick={() => openEditModal(pet)}> <Edit2 className="icon" size={20} /> Editar</button>
              <button className="btn btn-delete"> <Trash2 className="icon" size={20} /> Deletar</button>
              <button className="btn btn-details"> <Info className="icon" size={20} /> Detalhes</button>
=======
              <button className="btn btn-edit" onClick={() => openEditModal(pet)}>
                <Edit2 className="icon" size={20} /> Editar
              </button>
              <button className="btn btn-delete" onClick={() => openDeleteModal(pet)}>
                <Trash2 className="icon" size={20} /> Deletar
              </button>
              <button className="btn btn-details" onClick={() => handleDetailsClick(pet.id)}>
                <Info className="icon" size={20} /> Detalhes
              </button>
              </div>
>>>>>>> Stashed changes
            </div>
          ))}

        {selectedPet && (
          <ModalEditPet pet={selectedPet} onClose={closeModal} />
        )}
      </div>
      <Footer />
    </>
  );
}
