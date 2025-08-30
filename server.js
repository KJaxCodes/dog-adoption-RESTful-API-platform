const app = require('./app'); // Import the app

const PORT = process.env.PORT || 3001; // Use the same port as in app.js

// start the server 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});