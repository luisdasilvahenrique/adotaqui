
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RegisteredAnimal from './pages/RegisteredAnimal';
import SearchForPets from './pages/SearchForPets';
import LoginForm from './pages/LoginForm';
import PainelMain from './pages/PainelMain';

import './css/App.css';
import RegisteredAnimal from '../pages/RegisteredAnimal';

function App() {
  return (
    <LoginForm />
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/registered-animal" element={<RegisteredAnimal />} />
        <Route path="/search-for-pets" element={<SearchForPets />} />
        <Route path="/painel-main" element={<PainelMain />} />
        <Route path="/login-form" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}