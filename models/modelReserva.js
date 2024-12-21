const { sequelize } = require('../config/config');
const DataTypes = require('sequelize');
const { modelVeiculo } = require('./modelVeiculo');
const { modelClientes } = require('./modelClientes');

const modelReserva = sequelize.define('Reserva', {
  id_reserva: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Correção do erro de "primáriaKey" para "primaryKey"
    autoIncrement: true,
    allowNull: false, // Correção do erro de "permitirNull" para "allowNull"
  },
  data_reserva: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_fim: {
    type: DataTypes.DATE,
    allowNull: false, // Correção do erro de "permitNull" para "allowNull"
  },
  status_reserva: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  id_veiculo_reserva: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Veiculos', // Nome da tabela associada
      key: 'id_veiculos',
    },
  },
  id_cliente_reserva: {
    type: DataTypes.INTEGER, // Correção de "Tipos de dados.INTEGER" para "DataTypes.INTEGER"
    allowNull: false,
    references: {
      model: 'Clientes', // Nome da tabela associada
      key: 'id_cliente',
    },
  }
}, {
  tableName: 'Reserva', // Nome da tabela no banco de dados
  timestamps: false, // Desativa as colunas createdAt e updatedAt
});

// Relacionamentos
modelVeiculo.hasMany(modelReserva, {
  foreignKey: 'id_veiculo_reserva',
  sourceKey: 'id_veiculos',
  as: 'Reservas', // Correção para o plural de reservas, se necessário
});

modelReserva.belongsTo(modelVeiculo, {
  foreignKey: 'id_veiculo_reserva',
  targetKey: 'id_veiculos',
  as: 'Veiculo',
});

modelClientes.hasMany(modelReserva, {
  foreignKey: 'id_cliente_reserva',
  sourceKey: 'id_cliente',
  as: 'Reservas', // Correção para o plural de reservas, se necessário
});

modelReserva.belongsTo(modelClientes, {
  foreignKey: 'id_cliente_reserva',
  targetKey: 'id_cliente',
  as: 'Cliente',
});

module.exports = { modelReserva };
