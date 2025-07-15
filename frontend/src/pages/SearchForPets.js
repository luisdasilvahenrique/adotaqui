import '../css/SearchForPets.css';

import Footer from '../components/Footer';
import PetDetails from '../components/PetDetails';

import { useNavigate } from 'react-router-dom';
import { Info, ArrowBigLeft, HandHeartIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SearchForPets() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    gender: '',
    breed: '',
    age: '',
  });
  const [showFilters, setShowFilters] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/pets')
      .then(res => setPets(res.data))
      .catch(err => console.error('Erro ao buscar os pets:', err));
  }, []);

  const filteredPets = pets.filter((pet) => {
    return (
      pet.adopted === 0 &&
      (filters.type === '' || pet.type_of_animal === filters.type) &&
      (filters.gender === '' || pet.gender === filters.gender) &&
      (filters.breed === '' || pet.breed === filters.breed) &&
      (filters.age === '' || (
        filters.age === '0-1' && pet.age <= 1 ||
        filters.age === '1-3' && pet.age > 1 && pet.age <= 3 ||
        filters.age === '4+' && pet.age > 3
      ))
    );
  });

  const getUniqueValues = (key) => [...new Set(pets.map(p => p[key]).filter(Boolean))];

  const handleDetailsClick = (id) => {
    const pet = pets.find(p => p.id === id);
    if (pet) setSelectedPet(pet);
  };

  const closeModal = () => setSelectedPet(null);

  return (
    <>
      <div className="container">
        <div className="content">
          <div className='back-home'>
            <button onClick={() => navigate('/')} className="btn btn-home">
              <ArrowBigLeft /> Voltar para Home
            </button>
          </div>
          <div className="filters-toggle">
            <button className="btn-toggle-filters" onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? <>Ocultar Filtros <ChevronUp size={16} /></> : <>Mostrar Filtros <ChevronDown size={16} /></>}
            </button>
          </div>

          {showFilters && (
            <div className="filters">
              <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
                <option value="">Todas as espécies</option>
                {getUniqueValues('type_of_animal').map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select value={filters.gender} onChange={(e) => setFilters({ ...filters, gender: e.target.value })}>
                <option value="">Todos os sexos</option>
                {getUniqueValues('gender').map(gender => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>

              <select value={filters.breed} onChange={(e) => setFilters({ ...filters, breed: e.target.value })}>
                <option value="">Todas as raças</option>
                {getUniqueValues('breed').map(breed => (
                  <option key={breed} value={breed}>{breed}</option>
                ))}
              </select>

              <select value={filters.age} onChange={(e) => setFilters({ ...filters, age: e.target.value })}>
                <option value="">Todas as idades</option>
                <option value="0-1">Até 1 ano</option>
                <option value="1-3">1 a 3 anos</option>
                <option value="4+">4 anos ou mais</option>
              </select>

              <button className="btn-clear" onClick={() => setFilters({ type: '', gender: '', breed: '', age: '' })}>
                Limpar Filtros
              </button>
            </div>
          )}

          <div className="search-container">
            {filteredPets.map((pet) => (
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
                  <button className="btn btn-adopt">
                    <HandHeartIcon className="icon" size={20} /> Adotar
                  </button>
                  <button className="btn btn-details" onClick={() => handleDetailsClick(pet.id)}>
                    <Info className="icon" size={20} /> Detalhes
                  </button>
                </div>
              </div>
            ))}

            {selectedPet && <PetDetails pet={selectedPet} onClose={closeModal} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
