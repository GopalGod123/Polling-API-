const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');

// Add options to a question
router.post('/:id/create', optionController.createOption);

// Add a vote to an option of a question
router.post('/:id/add_vote', optionController.addVote);

// Delete an option
router.delete('/:id', optionController.deleteOption);

module.exports = router;