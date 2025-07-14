import '../css/SearchForPets.css';

import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar_with_filters';
import PetDetails from '../components/PetDetails';

import { useNavigate } from 'react-router-dom';
import { Info, ArrowBigLeft, HandHeartIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SearchForPets() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getPets = async () => {
    try {
      const response = await axios.get('http://localhost:3001/pets');
      setPets(response.data);
    } catch (error) {
      console.error('Erro ao buscar os pets:', error);
    }
  };

  const handleDetailsClick = (id) => {
    const pet = pets.find((p) => p.id === id);
    if (pet) {
      setSelectedPet(pet);
    }
  };

  const closeModal = () => {
    setSelectedPet(null);
    setShowModal(false);
    getPets();
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <>
      <div className="container">
        <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        <div className="content" onClick={() => menuOpen && setMenuOpen(false)}>

          <div className='back-home'>
            <button onClick={() => navigate('/')} className="btn btn-home">
              <ArrowBigLeft /> Voltar para Home
            </button>
          </div>

          <div className="search-container">
            <div className='border-search'>
            </div>
            {pets
              .filter((pet) => pet.adopted === 0)
              .map((pet) => (
                <div key={pet.id} className="adoption-card" >
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
                    <button className="btn btn-adopt">
                      <HandHeartIcon className="icon" size={20} /> Adotar
                    </button>
                    <button className="btn btn-details" onClick={() => handleDetailsClick(pet.id)}>
                      <Info className="icon" size={20} /> Detalhes
                    </button>
                  </div>
                </div>
              ))}

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
