const {sequelize} = require('../config/config'); //variável de conexão.
const DataTypes = require('sequelize');

// Definição do modelo de Veiculo
const modelVeiculo = sequelize.define('Veiculos', {
  id_veiculos: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  modelo_veiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marca_veiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria_veiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  renavam: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quilometragem: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  ano_fabricacao: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  combustivel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco_diaria: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  status_disponibilidade: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  data_ultima_manutencao: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'Veiculos',
  timestamps: false //evita que seja criado tabelas que não estão no banco de dados.
});

module.exports = { modelVeiculo };