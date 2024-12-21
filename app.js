const express = require('express');

const app = express();

const port = 3000;

const path = require("path");

const veiculoRoutes = require('./routes/routerveiculo');
const reservasRoutes = require('./routes/routerreserva');
const manutencaoRoutes = require('./routes/routermanutencao');
const funcionariosRoutes = require('./routes/routerfuncionario');
const clientesRoutes = require('./routes/routerclientes');
const usuariorRoutes = require('./routes/routerUsuario');


const {connectToDatabase} = require("./config/config");
connectToDatabase();

// Middleware para parsing do corpo da requisição
app.use(express.json());
app.use(express.static(path.join(__dirname, "/views")));

// Rotas

app.use('/', veiculoRoutes);
app.use('/', reservasRoutes);
app.use('/', manutencaoRoutes);
app.use('/', funcionariosRoutes);
app.use('/', clientesRoutes);
app.use('/', usuariorRoutes);
app.use(cors());

// Conectar ao banco de dados e iniciar o servidor

app.listen(port, ()=>{
    console.log(`Servidor ouvindo na porta ${port}`);
});
