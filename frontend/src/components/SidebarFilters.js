// SidebarFilters.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/SidebarFilters.css';

export default function SidebarFilters({
  filters,
  onApply,
  onClear,
  className = '',
}) {
  // rascunho interno
  const [draft, setDraft] = useState(filters);

  // listas vindas do back‑end
  const [availableTypes, setAvailableTypes] = useState([]);
  const [availableGenders, setAvailableGenders] = useState([]);
  const [availableBreeds, setAvailableBreeds] = useState([]);

  /* ---------- obter tipos/gêneros na montagem ---------- */
  useEffect(() => {
    axios.get('http://localhost:3001/pets/filters/types')
      .then(res => setAvailableTypes(res.data))
      .catch(err => console.error('Erro ao buscar tipos:', err));

    axios.get('http://localhost:3001/pets/filters/genders')
      .then(res => setAvailableGenders(res.data))
      .catch(err => console.error('Erro ao buscar gêneros:', err));
  }, []);

  /* ---------- obter raças quando type_of_animal do draft muda ---------- */
  useEffect(() => {
    if (!draft.type_of_animal.length) {
      setAvailableBreeds([]);
      return;
    }

    axios.post('http://localhost:3001/pets/filters/breeds', {
      type_of_animal: draft.type_of_animal,
    })
      .then(res => setAvailableBreeds(res.data))
      .catch(err => console.error('Erro ao buscar raças:', err));
  }, [draft.type_of_animal]);

  /* ---------- helpers ---------- */
  const toggleCheckbox = (category, value) => {
    setDraft(prev => {
      const list = prev[category];
      const nextList = list.includes(value)
        ? list.filter(v => v !== value)
        : [...list, value];
      return { ...prev, [category]: nextList };
    });
  };

  /* ---------- render ---------- */
  return (
    <div className={`sidebarFilters ${className}`}>
      <h2 className="sidebarFilters-title">Filtros:</h2>

      {/* espécie */}
      <div className="sidebarFilters-group">
        <p className="sidebarFilters-label">Espécie:</p>
        {availableTypes.map(type => (
          <label key={type}>
            <input
              type="checkbox"
              checked={draft.type_of_animal.includes(type)}
              onChange={() => toggleCheckbox('type_of_animal', type)}
            />
            {type}
          </label>
        ))}
      </div>

      {/* raça */}
      <div className="sidebarFilters-group">
        <p className="sidebarFilters-label">Raça:</p>
        {availableBreeds.map(breed => (
          <label key={breed}>
            <input
              type="checkbox"
              checked={draft.breed.includes(breed)}
              onChange={() => toggleCheckbox('breed', breed)}
            />
            {breed}
          </label>
        ))}
      </div>

      {/* sexo */}
      <div className="sidebarFilters-group">
        <p className="sidebarFilters-label">Sexo:</p>
        {availableGenders.map(gender => (
          <label key={gender}>
            <input
              type="checkbox"
              checked={draft.gender.includes(gender)}
              onChange={() => toggleCheckbox('gender', gender)}
            />
            {gender}
          </label>
        ))}
      </div>

      {/* idade */}
      <div className="sidebarFilters-group">
        <p className="sidebarFilters-label">Idade:</p>
        <select
          value={draft.age}
          onChange={(e) => setDraft({ ...draft, age: e.target.value })}
        >
          <option value="">Todas</option>
          <option value="0-1">Até 1 ano</option>
          <option value="1-3">1 a 3 anos</option>
          <option value="4+">4+ anos</option>
        </select>
      </div>

      {/* botões */}
      <div className="sidebarFilters-actions">
        <button onClick={() => onApply(draft)}>Aplicar</button>
        <button
          onClick={() => {
            onClear();
            setDraft({ type_of_animal: [], gender: [], breed: [], age: '' });
            setAvailableBreeds([]);
          }}
        >
          Limpar
        </button>
      </div>
    </div>
  );
}
