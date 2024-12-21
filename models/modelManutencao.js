const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/config');

const {modelVeiculo} = require('./modelVeiculo');

// Definição do modelo de Manutenção
const modelManutencao = sequelize.define('Manutencao', {

    id_manutencao:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },  
    data: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    custo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_veiculo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{

    tableName: 'Manutencao',  // Nome da tabela no banco de dados
    timestamps: false,     // Desativa as colunas createdAt e updatedAt
  });
    
modelManutencao.belongsTo(modelVeiculo, {
    foreignKey: 'id_veiculos',
    as: 'Veiculo'
  });

modelVeiculo.hasMany(modelManutencao, {
    foreignKey: 'id_veiculo_manutencao',
    as: 'Manutencao'
  });

module.exports = { modelManutencao };