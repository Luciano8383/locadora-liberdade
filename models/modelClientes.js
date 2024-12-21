const {sequelize} = require('../config/config'); //variável de conexão.
const DataTypes = require('sequelize');

// Definição do modelo de Cliente
const modelClientes = sequelize.define('Cliente', {

    id_cliente:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true

    },
    nome:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    endereco:{
      type: DataTypes.STRING,
    },
    profissao:{
      type: DataTypes.STRING,
    }
 },{
        tableName: 'Cliente',
    timestamps: false //evita que seja criado tabelas que não estão no banco de dados.
});
  module.exports = {modelClientes};