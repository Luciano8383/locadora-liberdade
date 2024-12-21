const express = require('express');
const router = express.Router();

const {funcionarioController} = require("../controllers/funcionarioController");

router.get("/listarFuncionario", funcionarioController.listarFuncionario);
router.post("/criarFuncionario", funcionarioController.criarFuncionario);
router.put("/atualizarFuncionario/:id_funcionario", funcionarioController.editarFuncionario);
router.delete("/deletarFuncionario/:id_funcionario", funcionarioController.deletarFuncionario);


module.exports =  router;