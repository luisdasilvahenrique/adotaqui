import { useState } from 'react';
import '../css/SidebarFilters.css';

export default function SidebarFilters({ onFilter, onClear, className = '' }) {
  const [filters, setFilters] = useState({
    species: [],
    gender: [],
    breed: [],
    vaccinated: [],
    neutered: [],
    age: '',
  });

  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const handleAgeChange = (e) => {
    setFilters({ ...filters, age: e.target.value });
  };

  const handleSubmit = () => {
    onFilter(filters);
  };

  const handleClear = () => {
    setFilters({
      species: [],
      gender: [],
      breed: [],
      vaccinated: [],
      neutered: [],
      age: '',
    });
    onClear();
  };

  return (
    <div className={`sidebarFilters ${className}`}>
      <h2 className="sidebarFilters-title">filtros:</h2>

      <div className="sidebarFilters-group">
        <p className="sidebarFilters-label">Espécie:</p>
        <div><label className="widht-auto sem-negrito">Cachorro</label> <input className="widht-auto" type="checkbox" checked={filters.species.includes('Cachorro')} onChange={() => handleCheckboxChange('species', 'Cachorro')} /></div>
        <div><label className="widht-auto sem-negrito">Gato</label> <input className="widht-auto" type="checkbox" checked={filters.species.includes('Gato')} onChange={() => handleCheckboxChange('species', 'Gato')} /></div>
      </div>

      <div className="sidebarFilters-group">
        <p className="sidebarFilters-label">Idade:</p>
        <select className="sidebarFilters-select" value={filters.age} onChange={handleAgeChange}>
          <option value="">Todas</option>
          <option value="0-1">Até 1 ano</option>
          <option value="1-3">1 a 3 anos</option>
          <option value="4+">4 anos ou mais</option>
        </select>
      </div>

      <div className="sidebarFilters-group">
        <p className="sidebarFilters-label">Sexo:</p>
        <div><label className="widht-auto sem-negrito">Masculino</label> <input className="widht-auto" type="checkbox" checked={filters.gender.includes('Masculino')} onChange={() => handleCheckboxChange('gender', 'Masculino')} /></div>
        <div><label className="widht-auto sem-negrito">Feminino</label> <input className="widht-auto" type="checkbox" checked={filters.gender.includes('Feminino')} onChange={() => handleCheckboxChange('gender', 'Feminino')} /></div>
      </div>

      <div className="sidebarFilters-group">
        <p className="sidebarFilters-label">Raça:</p>
        {['Pastor Alemão', 'Siamês', 'Persa', 'Angorá', 'Maine Coon'].map(breed => (
          <div key={breed}>
            <label className="widht-auto sem-negrito">{breed}</label>
            <input
              type="checkbox"
              className="widht-auto"
              checked={filters.breed.includes(breed)}
              onChange={() => handleCheckboxChange('breed', breed)}
            />
          </div>
        ))}
      </div>

      <div className="sidebarFilters-group">
        <p className="sidebarFilters-label">Vacinado:</p>
        <div><label className="widht-auto sem-negrito">Sim</label> <input className="widht-auto" type="checkbox" checked={filters.vaccinated.includes('Sim')} onChange={() => handleCheckboxChange('vaccinated', 'Sim')} /></div>
        <div><label className="widht-auto sem-negrito">Não</label> <input className="widht-auto" type="checkbox" checked={filters.vaccinated.includes('Não')} onChange={() => handleCheckboxChange('vaccinated', 'Não')} /></div>
      </div>

      <div className="sidebarFilters-group">
        <p className="sidebarFilters-label">Castrado:</p>
        <div><label className="widht-auto sem-negrito">Sim</label> <input className="widht-auto" type="checkbox" checked={filters.neutered.includes('Sim')} onChange={() => handleCheckboxChange('neutered', 'Sim')} /></div>
        <div><label className="widht-auto sem-negrito">Não</label> <input className="widht-auto" type="checkbox" checked={filters.neutered.includes('Não')} onChange={() => handleCheckboxChange('neutered', 'Não')} /></div>
      </div>

      <div className="sidebarFilters-actions">
        <button className="btn-filter" onClick={handleSubmit}>Filtrar</button>
        <button className="btn-clear" onClick={handleClear}>Limpar</button>
      </div>
    </div>
  );
}
