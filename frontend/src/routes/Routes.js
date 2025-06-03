import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing the pages
import Home from '../App';
import AdoptionQueue from '../pages/AdoptionQueue';
import ModalEditPet from '../components/ModalEditPet';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adoption-queue" element={<AdoptionQueue />} />
        <Route path='/modal-edit-pet' element={<ModalEditPet />} />
      </Routes>
      
    </BrowserRouter>
  );
}
