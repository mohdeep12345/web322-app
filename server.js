// Import required modules
const express = require('express');
const path = require('path');
const storeService = require('./store-service'); // Ensure this path is correct

// Create an Express application
const app = express();

// Set up static middleware for serving CSS, JS, images
app.use(express.static(path.join(__dirname, 'public'))); // Use path.join for safety

// Define routes

// Redirect root ("/") to /about
app.get('/', (req, res) => {
    res.redirect('/about');
});

// Serve the about.html page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html')); // Adjusted path for clarity
});

// /shop route - return only published items
app.get('/shop', (req, res) => {
    storeService.getPublishedItems()
        .then((data) => res.json(data))  // Send published items back as JSON
        .catch((err) => {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ message: "Error retrieving published items." });
        });
});

// /items route - return all items
app.get('/items', (req, res) => {
    storeService.getAllItems()
        .then((data) => res.json(data))  // Send all items back as JSON
        .catch((err) => {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ message: "Error retrieving all items." });
        });
});

// /categories route - return all categories
app.get('/categories', (req, res) => {
    storeService.getCategories()
        .then((data) => res.json(data))
        .catch((err) => {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ message: "Error retrieving categories." });
        });
});

// Custom 404 route for unmatched routes
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Initialize the store-service module and start the server
storeService.initialize()
    .then(() => {
        // If initialization is successful, start the server
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Express HTTP server listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        // If there is an error during initialization, log the error and do not start the server
        console.error('Failed to initialize the store service: ' + err);
    });
