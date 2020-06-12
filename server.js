const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('build'));

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, 'build/index.html'));
});

app.listen(8080);
