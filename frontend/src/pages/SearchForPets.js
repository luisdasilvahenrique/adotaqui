import '../css/SearchForPets.css';
import Footer from '../components/Footer';
import Sidebar from '../components/SidebarWithFilters';
import PetDetails from '../components/PetDetails';

import { useNavigate } from 'react-router-dom';
import { Info, ArrowBigLeft, HandHeartIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SearchForPets() {
  const [pets, setPets] = useState([]);
  const [allPets, setAllPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    type_of_animal: [],
    gender: [],
    breed: [],
    vaccinated: [],
    neutered: [],
    age: '',
  });

  /* ---------- carrega todos os pets 1x ---------- */
  const getPets = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/pets');
      setAllPets(data);
      setPets(data);
    } catch (err) {
      console.error('Erro ao buscar os pets:', err);
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  /* ---------- filtra localmente ---------- */
  const getPetsFiltered = (f) => {
    setFilters(f);                // armazena filtros escolhidos

    let filtered = [...allPets];

    if (f.type_of_animal.length)
      filtered = filtered.filter(p => f.type_of_animal.includes(p.type_of_animal));

    if (f.gender.length)
      filtered = filtered.filter(p => f.gender.includes(p.gender));

    if (f.breed.length)
      filtered = filtered.filter(p => f.breed.includes(p.breed));

    if (f.vaccinated.length)
      filtered = filtered.filter(p => f.vaccinated.includes(p.vaccinated));

    if (f.neutered.length)
      filtered = filtered.filter(p => f.neutered.includes(p.neutered));

    if (f.age) {
      filtered = filtered.filter(p => {
        const age = Number(p.age);
        if (f.age === '0-1') return age <= 1;
        if (f.age === '1-3') return age >= 1 && age <= 3;
        if (f.age === '4+') return age >= 4;
        return true;
      });
    }

    setPets(filtered);
  };

  /* ---------- callbacks passados à Sidebar ---------- */
  const applyFilters = (draft) => {
    getPetsFiltered(draft);       // filtra só quando clica em Aplicar
  };

  const clearFilters = () => {
    const empty = { type_of_animal: [], gender: [], breed: [], vaccinated: [], neutered: [], age: '' };
    setFilters(empty);
    setPets(allPets);             // restaura resultados completos
  };

  /* ---------- detalhes ---------- */
  const handleDetailsClick = (id) => {
    const pet = pets.find(p => p.id === id);
    if (pet) setSelectedPet(pet);
  };

  return (
    <>
      <div className="container">
        <Sidebar
          filters={filters}
          onApply={applyFilters}
          onClear={clearFilters}
        />

        <div className="content">
          <div className="back-home">
            <button className="btn btn-home" onClick={() => navigate('/painel-main')}>
              <ArrowBigLeft /> Voltar para Home
            </button>
          </div>

          <div className="search-container">
            {pets
              .filter(p => !p.adopted)
              .map(pet => (
                <div key={pet.id} className="adoption-card">
                  <img
                    src={pet.image_of_animal || '/imgs/placeholder.jpg'}
                    alt={pet.name || 'Pet sem nome'}
                    className="pet-photo"
                  />
                  <div className="pet-info">
                    <h2 className="pet-name">{pet.name ?? 'Pet sem nome'}</h2>
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
                      <HandHeartIcon size={20} /> Adotar
                    </button>
                    <button
                      className="btn btn-details"
                      onClick={() => handleDetailsClick(pet.id)}
                    >
                      <Info size={20} /> Detalhes
                    </button>
                  </div>
                </div>
              ))}

            {selectedPet && (
              <PetDetails
                pet={selectedPet}
                onClose={() => setSelectedPet(null)}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
