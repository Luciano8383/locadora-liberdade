const express = require('express');
const router = express.Router();

const {manutencaoController} = require("../controllers/manutencaoController");

router.get("/listarManutencao", manutencaoController.listarManutencao);
router.post("/criarManutencao", manutencaoController.criarManutencao);
router.put("/atualizarManutencao/:id_manutencao", manutencaoController.editarManutencao);
router.delete("/deletarManutencao/:id_manutencao", manutencaoController.deletarManutencao);


module.exports =  router;