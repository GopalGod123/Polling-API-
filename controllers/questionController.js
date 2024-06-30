const Question = require('../models/Question');

exports.createQuestion = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        const question = new Question({ title });
        await question.save();
        res.status(201).json(question);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        await Question.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id).populate('options');
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate('options');
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};