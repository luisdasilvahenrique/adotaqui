import '../css/ModalDeletePet.css';
import { X } from 'lucide-react';

export default function ModalDeletePet({ pet, onClose, onConfirm }) {
  if (!pet) return null;

  return (
    <div className="modal-delete-pet-overlay">
      <div className="modal-delete-pet-box">
        <button className="close-btn-pet" onClick={onClose}>
          <X size={22} />
        </button>

        <h2 className="delete-title-pet">Confirmar Exclusão</h2>
        <p className="delete-message-pet">
          Você tem certeza que deseja excluir o pet <strong>{pet.name_animal || pet.name}</strong>?
        </p>

        <div className="delete-actions-pet">
          <button className="btn-cancel-pet" onClick={onClose}>Cancelar</button>
          <button className="btn-confirm-pet" onClick={() => onConfirm(pet.id)}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}
