const express = require('express');
const { resolve } = require('path');
const path = require('path');

const app = express();

// Estáticos -> Roteamento dos Componentes
app.use('/', express.static(resolve(__dirname, './dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(process.env.PORT || 3000, (err) => {
  console.log('err', err);
});
