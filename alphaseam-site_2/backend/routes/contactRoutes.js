const express = require('express');
const {
  getContacts,
  createContact,
  deleteContact,
} = require('../controllers/contactController');

const router = express.Router();

router.get('/', getContacts);
router.post('/', createContact);
router.delete('/:id', deleteContact);

module.exports = router;
