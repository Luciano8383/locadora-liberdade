const express = require('express');
const router = express.Router();

const {financeiroController} = require("../controllers/financeiroController");

router.get("/listarFinanceiro", financeiroController.listarRelatorioFinanceiro);
router.post("/criarFinanceiro", financeiroController.criarRelatorioFinanceiro);
router.put("/atualizarFinanceiro/:id_financeiro", financeiroController.editarRelatorioFinanceiro);
router.delete("/deletarFinanceiro/:id_financeiro", financeiroController.deletarRelatorioFinanceiro);

module.exports =  router;