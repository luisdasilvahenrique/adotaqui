const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.get('/', petController.listPets);
router.post('/', petController.createPet);
router.put('/:id', petController.updatePet);
router.delete('/:id', petController.deletePet);
router.get('/:id', petController.getPetById);
router.get('/filters/types', petController.getTypes);
router.get('/filters/genders', petController.getGenders);
router.post('/filters/breeds', petController.getBreeds);

module.exports = router;
