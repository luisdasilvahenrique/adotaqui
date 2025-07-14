// SidebarFilters.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/SidebarFilters.css';

export default function SidebarFilters({ onFilter, onClear, className = '' }) {
  const [filters, setFilters] = useState({
    type_of_animal: [],
    gender: [],
    breed: [],
    age: '',
  });

  const [availableTypes, setAvailableTypes] = useState([]);
  const [availableGenders, setAvailableGenders] = useState([]);
  const [availableBreeds, setAvailableBreeds] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/pets/filters/types')
      .then(res => setAvailableTypes(res.data))
      .catch(err => console.error('Erro ao buscar tipos:', err));

    axios.get('http://localhost:3001/pets/filters/genders')
      .then(res => setAvailableGenders(res.data))
      .catch(err => console.error('Erro ao buscar gêneros:', err));
  }, []);

  useEffect(() => {
    if (filters.type_of_animal.length === 0) {
      setAvailableBreeds([]);
      return;
    }

    axios.post('http://localhost:3001/pets/filters/breeds', {
      type_of_animal: filters.type_of_animal
    })
    .then(res => setAvailableBreeds(res.data))
    .catch(err => console.error('Erro ao buscar raças:', err));
  }, [filters.type_of_animal]);

  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const handleAgeChange = (e) => {
    setFilters({ ...filters, age: e.target.value });
  };

  const handleSubmit = () => onFilter(filters);
  const handleClear = () => {
    setFilters({ type_of_animal: [], gender: [], breed: [], age: '' });
    setAvailableBreeds([]);
    console.log('Filtros limpos');
    onClear();
  };

  return (
    <div className={`sidebarFilters ${className}`}>
      <h2 className="sidebarFilters-title">Filtros:</h2>

      <div className="sidebarFilters-group">
        <p className="sidebarFilters-label">Espécie:</p>
        {availableTypes.map((type) => (
          <div key={type}>
            <label>{type}</label>
            <input
              type="checkbox"
              checked={filters.type_of_animal.includes(type)}
              onChange={() => handleCheckboxChange('type_of_animal', type)}
            />
          </div>
        ))}
      </div>

      <div className="sidebarFilters-group">
        <p className="sidebarFilters-label">Raça:</p>
        {availableBreeds.map((breed) => (
          <div key={breed}>
            <label>{breed}</label>
            <input
              type="checkbox"
              checked={filters.breed.includes(breed)}
              onChange={() => handleCheckboxChange('breed', breed)}
            />
          </div>
        ))}
      </div>

      <div className="sidebarFilters-group">
        <p className="sidebarFilters-label">Sexo:</p>
        {availableGenders.map((gender) => (
          <div key={gender}>
            <label>{gender}</label>
            <input
              type="checkbox"
              checked={filters.gender.includes(gender)}
              onChange={() => handleCheckboxChange('gender', gender)}
            />
          </div>
        ))}
      </div>

      <div className="sidebarFilters-group">
        <p className="sidebarFilters-label">Idade:</p>
        <select value={filters.age} onChange={handleAgeChange}>
          <option value="">Todas</option>
          <option value="0-1">Até 1 ano</option>
          <option value="1-3">1 a 3 anos</option>
          <option value="4+">4 anos ou mais</option>
        </select>
      </div>

      <div className="sidebarFilters-actions">
        <button onClick={handleSubmit}>Aplicar</button>
        <button onClick={handleClear}>Limpar</button>
      </div>
    </div>
  );
}
