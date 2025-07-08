const express = require('express');
const {
  getCareers,
  createCareer,
  updateCareer,
  deleteCareer,
} = require('../controllers/careerController');

const router = express.Router();

router.get('/', getCareers);
router.post('/', createCareer);
router.put('/:id', updateCareer);
router.delete('/:id', deleteCareer);

module.exports = router;
