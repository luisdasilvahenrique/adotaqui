import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../App';
import AdoptionQueue from '../pages/AdoptionQueue';
import ModalEditPet from '../components/ModalEditPet';
import { Search } from 'lucide-react';
import SearchForPets from '../pages/SearchForPets';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adoption-queue" element={<AdoptionQueue />} />
        <Route path="/search-for-pets" element={<SearchForPets />} />
        <Route path='/modal-edit-pet' element={<ModalEditPet />} />
      </Routes>

    </BrowserRouter>
  );
}
