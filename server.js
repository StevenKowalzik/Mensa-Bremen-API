//Server.js Main Entry Point

// Requirements
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Settings
const port = 8080;
app.use(bodyParser.json());

// require routes
require('./routes')(app);

// Start server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// 404 Error
app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found!` });
});
