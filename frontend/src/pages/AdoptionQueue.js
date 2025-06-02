import '../css/AdoptionQueue.css';

import Footer from '../components/Footer';

import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft, Trash2, Info, Edit2 } from 'lucide-react';

export default function AdoptionQueue() {
  const fakePets = [
    {
      id: 1,
      nome: 'Spike',
      idade: 2,
      especie: 'Cachorro',
      sexo: 'Masculino',
      raca: 'Pastor Alemão',
      status: 'Aguardando adoção',
      foto: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 2,
      nome: 'Spike',
      idade: 3,
      especie: 'Cachorro',
      sexo: 'Masculino',
      raca: 'Pastor Alemão',
      status: 'Aguardando adoção',
      foto: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 3,
      nome: 'Spike',
      idade: 4,
      especie: 'Cachorro',
      sexo: 'Masculino',
      raca: 'Pastor Alemão',
      status: 'Aguardando adoção',
      foto: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <div className="adoption-container">
        <button onClick={() => navigate('/')} className="btn btn-home">
          <ArrowBigLeft className="arrow-left" /> Voltar para Home
        </button>
        <h1 className="adoption-title">Fila de Adoção</h1>

        {/* lista de pets */}
        {fakePets.map((pet) => (
          <div key={pet.id} className="adoption-card">
            <img src={pet.foto} alt={pet.nome} className="pet-photo" />
            <div className="pet-info">
              <h2 className="pet-name">{pet.nome}</h2>
              <p className="pet-detail">
                Espécie: {pet.especie} | Idade: {pet.idade} | Sexo: {pet.sexo}
              </p>
              <p className="pet-detail">Raça: {pet.raca}</p>
              <p className="pet-status">
                Status: <strong>{pet.status}</strong>
              </p>
            </div>
            <div className="action-buttons">
              <button className="btn btn-edit"> <Edit2 className="icon" size={20} /> Editar</button>
              <button className="btn btn-delete"> <Trash2 className="icon" size={20} /> Deletar</button>
              <button className="btn btn-details"> <Info className="icon" size={20} /> Detalhes</button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
