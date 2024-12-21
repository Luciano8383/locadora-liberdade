const express = require('express');

const app = express();

const port = 3000;

const path = require("path");

const veiculoRoutes = require('./routes/routerveiculo');
const reservasRoutes = require('./routes/routerreserva');
const manutencaoRoutes = require('./routes/routermanutencao');
const funcionariosRoutes = require('./routes/routerfuncionario');
const clientesRoutes = require('./routes/routerclientes');


const {connectToDatabase} = require("./config/config");
connectToDatabase();

// Middleware para parsing do corpo da requisição
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Rotas
app.use('/', veiculoRoutes);
app.use('/', reservasRoutes);
app.use('/', manutencaoRoutes);
app.use('/', funcionariosRoutes);
app.use('/', clientesRoutes);

// Conectar ao banco de dados e iniciar o servidor

app.use(express.static(path.join(__dirname, "/views")));

app.listen(port, ()=>{
    console.log(`Servidor ouvindo na porta ${port}`);
});