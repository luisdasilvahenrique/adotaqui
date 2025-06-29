import '../css/SidebarFilters.css';

export default function SidebarFilters({ filters, setFilters, className = '' }) {
  const handleCheckboxChange = (category, value) => {
    const current = filters[category];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setFilters({ ...filters, [category]: updated });
  };

  const handleAgeChange = (e) => {
    setFilters({ ...filters, age: e.target.value });
  };

  const handleClear = () => {
    setFilters({
      type_of_animal: [],
      gender: [],
      breed: [],
      vaccinated: [],
      neutered: [],
      age: '',
    });
  };


  return (
    <div className={`sidebarFilters ${className}`}>
      <h2 className="sidebarFilters-title">filtros:</h2>

      <div className="sidebarFilters-group">
        <p className="sidebarFilters-label">Espécie:</p>
        <div><label className="widht-auto sem-negrito">Cachorro</label> <input className="widht-auto" type="checkbox" checked={filters.type_of_animal.includes('cao')} onChange={() => handleCheckboxChange('type_of_animal', 'cao')} /></div>
        <div><label className="widht-auto sem-negrito">Ave</label> <input className="widht-auto" type="checkbox" checked={filters.type_of_animal.includes('ave')} onChange={() => handleCheckboxChange('type_of_animal', 'ave')} /></div>
        <div><label className="widht-auto sem-negrito">Gato</label> <input className="widht-auto" type="checkbox" checked={filters.type_of_animal.includes('gato')} onChange={() => handleCheckboxChange('type_of_animal', 'gato')} /></div>
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
        <p className="sidebarFilters-label">Gênero:</p>
        <div><label className="widht-auto sem-negrito">Macho</label> <input className="widht-auto" type="checkbox" checked={filters.gender.includes('Macho')} onChange={() => handleCheckboxChange('gender', 'Macho')} /></div>
        <div><label className="widht-auto sem-negrito">Fêmea</label> <input className="widht-auto" type="checkbox" checked={filters.gender.includes('Fêmea')} onChange={() => handleCheckboxChange('gender', 'Fêmea')} /></div>
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

      
    </div>
  );
}
