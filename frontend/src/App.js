
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdoptionQueue from './pages/AdoptionQueue';
import SearchForPets from './pages/SearchForPets';
import Panel from './pages/Panel';
import LoginForm from './pages/LoginForm';

import './css/App.css';

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
        <Route path="adoption-queue" element={<AdoptionQueue />} />
        <Route path="search-for-pets" element={<SearchForPets />} />
        <Route path="panel" element={<Panel/>} />
        <Route path="loginForm" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}