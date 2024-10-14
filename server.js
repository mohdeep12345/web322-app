//WEB322 – Assignment 02
//I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
//No part of this assignment has been copied manually or electronically from any other source (including 3rd party web sites) or distributed to other students.

//Name: Mohdeep Singh
//Student ID: 109600239
//Date: 14 October 2024
//Vercel Web App URL: 
//GitHub Repository URL: https://github.com/mohdeep12345/web322-app.git

//********************************************************************************/ 

// Import required modules
const express = require('express');
const app = express();
const path = require('path');
const storeService = require('./store-service'); // Ensure this path is correct

// Set up static middleware for serving CSS, JS, images
app.use(express.static(path.join(__dirname, 'public'))); // Adjusted to use path.join for safety

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
    storeService.getPublishedItems() // Ensure this function exists in store-service
        .then((data) => {
            res.json(data);  // Send the published items back to the client as JSON
        })
        .catch((err) => {
            res.status(500).json({ message: err });  // Send an error message if it fails
        });
});

// /items route - return all items
app.get('/items', (req, res) => {
    storeService.getAllItems()
        .then((data) => {
            res.json(data);  // Send all items back to the client as JSON
        })
        .catch((err) => {
            res.status(500).json({ message: err });  // Send an error message if it fails
        });
});

// /categories route - return all categories
app.get('/categories', (req, res) => {
    storeService.getCategories() // Ensure this function is defined in store-service
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
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
        app.listen(process.env.PORT || 8080, () => {
            console.log('Express http server listening on port 8080');
        });
    })
    .catch((err) => {
        // If there is an error during initialization, log the error and do not start the server
        console.log('Failed to initialize the store service: ' + err);
    });
