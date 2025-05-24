import { useNavigate } from 'react-router-dom';

export default function CardPet({ icon, title, to }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
  };

  return (
    <div className="card" onClick={handleClick}>
      {icon}
      <h3>{title}</h3>
    </div>
  );
}