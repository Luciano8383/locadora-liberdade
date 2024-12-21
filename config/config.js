const express = require("express");

const app = express();

const Sequelize = require("sequelize");

const sequelize = new Sequelize('locacaoVeiculos', 'sa', 'UserAdm123',{

    dialect: 'mssql',
    dialectModule: require('tedious'),
    host: 'localhost',
    port: 1433
});

//SEMPRE UTILIZAR FUNÇOES ASSÍNCRONAS QUANDO NECESSITAR DE CONEXÕES COM O BANCO DE DADOS.

const connectToDatabase = async () => {
   try {
      await sequelize.authenticate();
      console.log('Conexão com o banco de dados realizada com sucesso!');
   } catch (error) { 
      console.log(`Erro ao conectar com o banco de dados: ${error}`);
   }
};

module.exports = {sequelize, connectToDatabase};