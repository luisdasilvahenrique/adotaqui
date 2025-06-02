import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing the pages
import Home from '../App';
import AdoptionQueue from '../pages/AdoptionQueue';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adoption-queue" element={<AdoptionQueue />} />
      </Routes>
      
    </BrowserRouter>
  );
}
