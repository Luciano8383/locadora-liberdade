const express = require('express');
const router = express.Router();

const {veiculoController} =  require("../controllers/veiculoController");

router.get("/listarVeiculos", veiculoController.listarVeiculo);
router.post("/criarVeiculo", veiculoController.criarVeiculo);
router.put("/atualizarVeiculo/:id_veiculos", veiculoController.editarVeiculo);
router.delete("/deletarVeiculo/:id_veiculos", veiculoController.deletarVeiculo);

module.exports =  router;