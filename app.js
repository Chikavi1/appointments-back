const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db');
const citasRouter = require('./routes/index');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/', citasRouter);

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
sequelize.sync().then(() => {
});