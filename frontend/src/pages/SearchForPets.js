import '../css/SearchForPets.css';

import Footer from '../components/Footer';
import ModalEditPet from '../components/ModalEditPet';
import Sidebar from '../components/SidebarWithFilters';
import PetDetails from '../components/PetDetails';

import { useNavigate } from 'react-router-dom';
import { Trash2, Info, Edit2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SearchForPets() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({
    type_of_animal: [],
    gender: [],
    breed: [],
    vaccinated: [],
    neutered: [],
    age: '',
  });

  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);
  const navigate = useNavigate();

  const getPets = async () => {
    try {
      const response = await axios.get('http://localhost:3001/pets');
      setPets(response.data);
    } catch (error) {
      console.error('Erro ao buscar os pets:', error);
    }
  };

  const getPetsFiltered = async (filters) => {
  try {
    const response = await axios.get('http://localhost:3001/pets');
    let filtered = response.data;

    if (filters.type_of_animal.length) {
      filtered = filtered.filter(pet => filters.type_of_animal.includes(pet.type_of_animal));
    }

    if (filters.gender.length) {
      filtered = filtered.filter(pet => filters.gender.includes(pet.gender));
    }

    if (filters.breed.length) {
      filtered = filtered.filter(pet => filters.breed.includes(pet.breed));
    }

    if (filters.vaccinated.length) {
      filtered = filtered.filter(pet => filters.vaccinated.includes(pet.vaccinated));
    }

    if (filters.neutered.length) {
      filtered = filtered.filter(pet => filters.neutered.includes(pet.neutered));
    }

    if (filters.age) {
      filtered = filtered.filter(pet => {
        const age = Number(pet.age);
        if (filters.age === '0-1') return age <= 1;
        if (filters.age === '1-3') return age >= 1 && age <= 3;
        if (filters.age === '4+') return age >= 4;
        return true;
      });
    }

    console.log('Pets filtrados localmente:', filtered);
    setPets(filtered);
  } catch (error) {
    console.error('Erro ao filtrar pets localmente:', error);
  }
};

  const handleDetailsClick = (id) => {
    const pet = pets.find((p) => p.id === id);
    if (pet) setSelectedPet(pet);
  };

  const openDeleteModal = (pet) => {
    setPetToDelete(pet);
    setShowDeleteModal(true);
  };

  const openEditModal = (pet) => {
    setSelectedPet(pet);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPet(null);
    setShowModal(false);
    getPets(); // recarrega pets após edição
  };

  const handleClearFilters = () => {
    setFilters({
      type_of_animal: [],
      gender: [],
      breed: [],
      vaccinated: [],
      neutered: [],
      age: '',
    });
  };

  // Fetch inicial
  useEffect(() => {
    getPets();
  }, []);

  // Aplica filtros sempre que filtros mudarem
  useEffect(() => {
    console.log('Filtros atualizados:', filters);
    getPetsFiltered(filters);
  }, [filters]);
  return (
    <>
      <div className="container">
        <Sidebar
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          filters={filters}
          setFilters={setFilters}
        />

        <div className="content" onClick={() => menuOpen && setMenuOpen(false)}>
          <div className="search-container">
            {pets
              .filter((pet) => pet.adopted === 0)
              .map((pet) => (
                <div key={pet.id} className="adoption-card">
                  <img src={pet.image_of_animal} alt={pet.name} className="pet-photo" />
                  <div className="pet-info">
                    <h2 className="pet-name">{pet.name == null ? 'Pet sem nome' : pet.name}</h2>
                    <p className="pet-detail">
                      Espécie: {pet.type_of_animal} | Idade:{' '}
                      {pet.age === 1 ? '1 ano' : `${pet.age} anos`} | Sexo: {pet.gender}
                    </p>
                    <p className="pet-detail">Raça: {pet.breed}</p>
                    <p className="pet-status">
                      Status: <strong>{pet.adopted ? 'Adotado' : 'Disponível'}</strong>
                    </p>
                  </div>
                  <div className="action-buttons">
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
                </div>
              ))}

            {selectedPet && showModal && (
              <ModalEditPet pet={selectedPet} onClose={closeModal} />
            )}

            {selectedPet && !showModal && (
              <PetDetails pet={selectedPet} onClose={closeModal} />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}