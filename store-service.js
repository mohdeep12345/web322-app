const fs = require('fs');
const path = require('path');

let items = [];
let categories = [];

module.exports = {
    initialize: function() {
        return new Promise((resolve, reject) => {
            // Read items.json
            fs.readFile(path.join(__dirname, 'data', 'items.json'), 'utf8', (err, data) => {
                if (err) {
                    return reject("Unable to read items file");
                }
                items = JSON.parse(data);

                // Read categories.json
                fs.readFile(path.join(__dirname, 'data', 'categories.json'), 'utf8', (err, data) => {
                    if (err) {
                        return reject("Unable to read categories file");
                    }
                    categories = JSON.parse(data);
                    resolve(); // Resolve the promise after both files are read
                });
            });
        });
    },

    // Get all items
    getAllItems: function() {
        return new Promise((resolve, reject) => {
            if (items.length > 0) {
                resolve(items); // Resolve with items if found
            } else {
                reject("No items found"); // Reject if no items found
            }
        });
    },

    // Get published items
    getPublishedItems: function() {
        return new Promise((resolve, reject) => {
            const publishedItems = items.filter(item => item.published === true);
            if (publishedItems.length > 0) {
                resolve(publishedItems); // Resolve with published items
            } else {
                reject("No published items found"); // Reject if no published items found
            }
        });
    },

    // Get categories
    getCategories: function() {
        return new Promise((resolve, reject) => {
            if (categories.length > 0) {
                resolve(categories); // Resolve with categories if found
            } else {
                reject("No categories found"); // Reject if no categories found
            }
        });
    }
};
