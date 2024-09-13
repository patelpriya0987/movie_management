const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const movieRoutes = require('./routes/movieRoutes');
const app = express();
const db = require('./config/db')

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', movieRoutes);

// Start server
app.listen(3005, () => {
    console.log('Server is running on port http://localhost:3005');
});
