const Option = require('../models/Option');
const Question = require('../models/Question');

exports.createOption = async (req, res) => {
    try {
        const { id } = req.params;
        const options = req.body;

        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        const createdOptions = [];
        for (const option of options) {
            if (!option.text) {
                return res.status(400).json({ error: 'Option text is required' });
            }

            const newOption = new Option({ text: option.text });
            await newOption.save();

            question.options.push(newOption);
            createdOptions.push(newOption);
        }

        await question.save();

        res.status(201).json(createdOptions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addVote = async (req, res) => {
    try {
        const { id } = req.params;
        const { votes = 1 } = req.body; // Get the number of votes from the request body

        const option = await Option.findById(id);
        if (!option) {
            return res.status(404).json({ error: 'Option not found' });
        }

        option.votes += votes; // Add the specified number of votes
        await option.save();

        res.status(200).json(option);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteOption = async (req, res) => {
    try {
        const { id } = req.params;
        const option = await Option.findById(id);
        if (!option) {
            return res.status(404).json({ error: 'Option not found' });
        }

        // Remove the option from the associated question's options array
        const question = await Question.findOne({ options: option._id });
        if (question) {
            question.options.pull(option._id);
            await question.save();
        }

        // Delete the option
        await Option.findByIdAndDelete(id);

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};