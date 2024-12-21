const {sequelize} = require('../config/config'); //variável de conexão.
const DataTypes = require('sequelize');

const modelFuncionario = sequelize.define('Funcionario', {
    id_funcionario:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_funcionario:{
        type: DataTypes.STRING,
        AllowNull: false
    },
    cpf_funcionario:{
        type: DataTypes.STRING,
        AllowNull: false
    },
    tel_funcionario: {
        type: DataTypes.STRING,

    },
    email:{
        type: DataTypes.STRING,
        AllowNull: false
    },
    senha:{
        type: DataTypes.STRING,
        AllowNull: false
    },
    privilegio_funcionario:{
        type: DataTypes.STRING,
        AllowNull: false
    }
},{
    tableName: 'Funcionario',
    timestamps: false //evita que seja criado tabelas que não estão no banco de dados.
});

module.exports = {modelFuncionario};