import '../css/PetDetails.css';

export default function PetDetails({ pet, onClose }) {
  if (!pet) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <header className="modal-header">
          <h2 className="modal-title">{pet.name || 'Pet sem nome'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>

        <section className="modal-body">
          <div className="image-section">
            <img
              src={pet.image_of_animal}
              alt={pet.name_animal}
              className="pet-image"
            />
          </div>

          <article className="info-section">
            <div className="info-row">
              <span className="label">Raça:</span>
              <span className="value">{pet.breed}</span>
            </div>
            <div className="info-row">
              <span className="label">Espécie:</span>
              <span className="value">{pet.type_of_animal}</span>
            </div>
            <div className="info-row">
              <span className="label">Idade:</span>
              <span className="value">
                {pet.age} {pet.age === 1 ? 'ano' : 'anos'}
              </span>
            </div>
            <div className="info-row">
              <span className="label">Sexo:</span>
              <span className="value">{pet.gender}</span>
            </div>
            <div className="info-row">
              <span className="label">Status:</span>
              <span className={`value ${pet.adopted ? 'adopted' : 'available'}`}>
                {pet.adopted ? 'Adotado' : 'Disponível'}
              </span>
            </div>
            {pet.description && (
              <div className="info-description">
                <span className="label">Descrição:</span>
                <p className="value">{pet.description}</p>
              </div>
            )}
          </article>
        </section>
      </div>
    </div>
  );
}