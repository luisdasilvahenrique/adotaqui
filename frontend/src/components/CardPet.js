import { useNavigate } from 'react-router-dom';
import '../css/CardPet.css'; 
export default function CardPet({ icon, title, to }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="icon">{icon}</div>
      <h3 className="title">{title}</h3>
    </div>
  );
}