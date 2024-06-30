const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const questionRoutes = require('./routes/questionRoutes');
const optionRoutes = require('./routes/optionRoutes');

const app = express();
const PORT = process.env.PORT || 8000;
const mongoURI = 'mongodb+srv://gopalkhandelwalstar:j3d6zIWQ3jzgMRly@cluster0pollingapi.zxboidc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0PollingAPI';

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Routes
app.use('/questions', questionRoutes);
app.use('/options', optionRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});