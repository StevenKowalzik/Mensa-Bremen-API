//Server.js Main Entry Point

// Requirements
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;


// Settings
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// require routes
require('./routes')(app, {});

// Start server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


// 404 Error
app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found!` });
});
