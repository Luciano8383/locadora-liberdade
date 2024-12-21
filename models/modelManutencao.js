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
    data_manutencao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo_manutencao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    custo_manutencao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_veiculo_manutencao: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true
    },
},{

    tableName: 'Manutencao',  // Nome da tabela no banco de dados
    timestamps: false,     // Desativa as colunas createdAt e updatedAt
  });
    
modelManutencao.belongsTo(modelVeiculo, {
    foreignKey: 'id_veiculo_manutencao',
    sourceKey: 'id_veiculos',
    as: 'Veiculo'
  });

modelVeiculo.hasMany(modelManutencao, {
    foreignKey: 'id_veiculo_manutencao',
    targetKey: 'id_veiculos',
    as: 'Manutencao'
  });

module.exports = { modelManutencao };