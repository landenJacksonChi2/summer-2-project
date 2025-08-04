const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/auth'); // Import the auth route

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('your-mongo-db-uri', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Setup session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'your-mongo-db-uri',
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
}));

// Routes
app.use('/auth', authRoutes);

// Home route
app.get('/', (req, res) => {
    if (req.session.userId) {
        res.send('Welcome to the homepage! You are logged in.');
    } else {
        res.send('Welcome to the homepage! Please log in or sign up.');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
