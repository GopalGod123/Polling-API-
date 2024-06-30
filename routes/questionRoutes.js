const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Create a question
router.post('/create', questionController.createQuestion);

// Delete a question
router.delete('/:id', questionController.deleteQuestion);

// View a question with its options and votes
router.get('/:id', questionController.getQuestion);

// Get all questions
router.get('/', questionController.getAllQuestions);

module.exports = router;